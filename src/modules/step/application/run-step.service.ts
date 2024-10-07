import { Injectable } from '@nestjs/common';
import { StepRepository } from '../domain/step.repository';
import { Variable } from 'src/modules/variable/domain/variable.entity';
import ProcessStatus from 'src/shared/enums/process-status.enum';
import Step from '../domain/step.entity';
import { FindOneOptions } from 'typeorm';
import { RunBlockService } from 'src/modules/block/application/run-block.service';

@Injectable()
export class RunStepService {
  constructor(
    private readonly stepRepository: StepRepository,
    private readonly runBlockService: RunBlockService,
  ) {}

  async run(step: Step, variables: Variable[]) {
    try {
      await this.#start(step);
      await this.runBlockService.run(step.blockId, variables);
      await this.#finish(step);
      return step;
    } catch (error) {
      await this.#finish(step, ProcessStatus.FAILURE, error.message);
      return step;
    }
  }

  async #start(step: Step) {
    step.status = ProcessStatus.RUNNING;
    await this.stepRepository.save(step);
  }

  async #finish(
    step: Step,
    status: ProcessStatus = ProcessStatus.SUCCESS,
    errorMessage?: string,
  ) {
    step.status = status;
    step.errorMessage = errorMessage;
    await this.stepRepository.save(step);
  }

  async findOne(findOneOptions?: FindOneOptions<Step>) {
    return this.stepRepository.findOne({
      ...findOneOptions,
      relations: {
        flow: {
          variables: true,
        },
      },
    });
  }
}
