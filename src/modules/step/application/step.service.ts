import { Injectable } from '@nestjs/common';
import { StepRepository } from '../domain/step.repository';
import { Variable } from 'src/modules/variable/domain/variable.entity';
import ProcessStatus from 'src/shared/enums/process-status.enum';
import { BlockService } from 'src/modules/block/application/block.service';
import Step from '../domain/step.entity';
import { FindOneOptions } from 'typeorm';

@Injectable()
export class StepService {
  constructor(
    private readonly stepRepository: StepRepository,
    private readonly blockService: BlockService,
  ) {}

  async run(id: number, variables: Variable[]) {
    const step = await this.stepRepository.findOneByOrFail({ id });
    await this.#start(step);

    await this.blockService.run(step.blockId, variables);

    await this.#finish(step);
  }

  async #start(step: Step) {
    step.status = ProcessStatus.RUNNING;
    await this.stepRepository.save(step);
  }

  async #finish(step: Step) {
    step.status = ProcessStatus.SUCCESS;
    await this.stepRepository.save(step);
  }

  async findOne(findOneOptions?: FindOneOptions<Step>) {
    return this.stepRepository.findOneOrFail({
      ...findOneOptions,
      relations: {
        flow: {
          variables: true,
        },
      },
    });
  }
}
