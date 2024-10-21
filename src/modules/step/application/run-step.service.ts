import { Inject, Injectable } from '@nestjs/common';
import { StepRepository } from '../domain/step.repository';
import ProcessStatus from 'src/shared/enums/process-status.enum';
import Step from '../domain/step.entity';
import { FindOneOptions } from 'typeorm';
import { RunBlockService } from 'src/modules/block/application/run-block.service';

@Injectable()
export class RunStepService {
  constructor(
    @Inject('StepRepository')
    private readonly stepRepository: StepRepository,
    private readonly runBlockService: RunBlockService,
  ) {}

  async run(step: Step) {
    try {
      await this.#start(step);
      await this.runBlockService.run(step.block);
      await this.#finish(step);
      return step;
    } catch (error) {
      console.error(error);
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
        flow: true,
        block: {
          step: true,
          functionBlock: true,
          parameters: true,
        },
      },
    });
  }
}
