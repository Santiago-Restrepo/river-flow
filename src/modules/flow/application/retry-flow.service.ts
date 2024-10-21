import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { RunFlowService } from './run-flow.service';
import ProcessStatus from 'src/shared/enums/process-status.enum';
import { ResetStepService } from 'src/modules/step/application/reset-step.service';
import Flow from '../domain/flow.entity';
import { FlowRepository } from '../domain/flow.repository';

@Injectable()
export class RetryFlowService {
  constructor(
    @Inject('FlowRepository')
    private readonly flowRepository: FlowRepository,
    private readonly runFlowService: RunFlowService,
    private readonly resetStepService: ResetStepService,
  ) {}

  async retry(id: number) {
    const flow = await this.#findFlowToRetry(id);
    await this.#resetFlowAndSteps(flow);
    return this.runFlowService.run(flow.id);
  }

  async #findFlowToRetry(id: number) {
    const flow = await this.flowRepository.findOneBy({
      id,
      status: ProcessStatus.FAILURE,
    });
    if (!flow)
      throw new NotFoundException(`Failured flow with id ${id} not found`);

    return flow;
  }

  #resetFlowAndSteps(flow: Flow) {
    return this.flowRepository.manager.transaction(async (transaction) => {
      await this.resetStepService.resetFlowSteps(flow, transaction);
      flow.status = ProcessStatus.PENDING;
      flow.errorMessage = null;
      await transaction.save(flow);
    });
  }
}
