import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import ProcessStatus from 'src/shared/enums/process-status.enum';
import { RunStepService } from 'src/modules/step/application/run-step.service';
import { FlowRepository } from '../domain/flow.repository';
import { FlowExecutionRepository } from 'src/modules/flow-execution/domain/flow-execution.repository';
import ExecutionStatus from 'src/shared/enums/execution-status.enum';
import FlowExecution from 'src/modules/flow-execution/domain/flow-execution.entity';

@Injectable()
export class RunFlowService {
  constructor(
    @Inject('FlowRepository')
    private readonly flowRepository: FlowRepository,
    private readonly flowExecutionRepository: FlowExecutionRepository,
    private readonly runStepService: RunStepService,
  ) {}

  async run(id: number) {
    const flow = await this.#findFlowToRun(id);
    const execution = await this.flowExecutionRepository.createExecution({
      flowId: flow.id,
    });

    try {
      await this.#start(execution);
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

  async #start(execution: FlowExecution) {
    return this.flowExecutionRepository.runExecution(execution);
  }

  async #runNextStep(flow: FlowExecution) {
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
    flow: FlowExecution,
    status: ProcessStatus = ProcessStatus.SUCCESS,
    errorMessage?: string,
  ) {
    flow.status = status;
    flow.errorMessage = errorMessage;
    await this.flowRepository.save(flow);
  }
}
