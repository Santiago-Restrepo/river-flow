import { Injectable } from '@nestjs/common';
import { FlowRepository } from '../domain/flow.repository';
import { StepService } from 'src/modules/step/application/step.service';
import Flow from '../domain/flow.entity';
import ProcessStatus from 'src/shared/enums/process-status.enum';

@Injectable()
export class FlowService {
  constructor(
    private readonly flowRepository: FlowRepository,
    private readonly stepService: StepService,
  ) {}

  async run(id: number) {
    const flow = await this.flowRepository.findOneByOrFail({
      id,
      status: ProcessStatus.PENDING,
    });

    await this.#start(flow);

    this.#runNextStep(flow);

    return flow;
  }

  async #start(flow: Flow) {
    flow.status = ProcessStatus.RUNNING;
    await this.flowRepository.save(flow);
  }

  async #runNextStep(flow: Flow) {
    const nextStep = await this.stepService.findOne({
      where: { flowId: flow.id, status: ProcessStatus.PENDING },
      order: { order: 'ASC' },
    });

    if (!nextStep) {
      await this.#finish(flow);
      return;
    }

    await this.stepService.run(nextStep.id, nextStep.flow.variables);

    return this.#runNextStep(flow);
  }

  async #finish(flow: Flow) {
    flow.status = ProcessStatus.SUCCESS;
    await this.flowRepository.save(flow);
  }
}
