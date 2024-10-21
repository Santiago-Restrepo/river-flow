import { Injectable } from '@nestjs/common';
import ProcessStatus from 'src/shared/enums/process-status.enum';
import Flow from 'src/modules/flow/domain/flow.entity';
import { EntityManager } from 'typeorm';
import Step from '../domain/step.entity';

@Injectable()
export class ResetStepService {
  constructor() {}

  async resetFlowSteps(flow: Flow, transaction: EntityManager) {
    const steps = await transaction.find(Step, {
      where: { flowId: flow.id },
    });
    for (const step of steps) {
      step.status = ProcessStatus.PENDING;
      step.errorMessage = null;
    }

    await transaction.save(steps);

    return steps;
  }
}
