import { Injectable, NotFoundException } from '@nestjs/common';
import { FlowRepository } from '../domain/flow.repository';
import Flow from '../domain/flow.entity';
import ProcessStatus from 'src/shared/enums/process-status.enum';
import { RunStepService } from 'src/modules/step/application/run-step.service';

@Injectable()
export class RunFlowService {
  constructor(
    private readonly flowRepository: FlowRepository,
    private readonly runStepService: RunStepService,
  ) {}

  async run(id: number) {
    const flow = await this.#findFlowToRun(id);
    try {
      await this.#start(flow);
      this.#runNextStep(flow);
      return flow;
    } catch (error) {
      await this.#finish(flow, ProcessStatus.FAILURE, error.message);
    }
  }

  async #findFlowToRun(id: number) {
    const flow = await this.flowRepository.findOneBy({
      id,
      status: ProcessStatus.PENDING,
    });

    if (!flow)
      throw new NotFoundException(`Pending flow with id ${id} not found`);

    return flow;
  }

  async #start(flow: Flow) {
    flow.status = ProcessStatus.RUNNING;
    await this.flowRepository.save(flow);
  }

  async #runNextStep(flow: Flow) {
    const nextStep = await this.runStepService.findOne({
      where: { flowId: flow.id, status: ProcessStatus.PENDING },
      order: { order: 'ASC' },
    });

    if (!nextStep) {
      await this.#finish(flow);
      return;
    }

    const nextStepResult = await this.runStepService.run(nextStep);

    if (nextStepResult.status === ProcessStatus.FAILURE) {
      await this.#finish(
        flow,
        ProcessStatus.FAILURE,
        nextStepResult.errorMessage,
      );
      return;
    }

    return this.#runNextStep(flow);
  }

  async #finish(
    flow: Flow,
    status: ProcessStatus = ProcessStatus.SUCCESS,
    errorMessage?: string,
  ) {
    flow.status = status;
    flow.errorMessage = errorMessage;
    await this.flowRepository.save(flow);
  }
}
