import { FindOneOptions } from 'typeorm';
import Step from './step.entity';

export interface StepRepository {
  findOne(findOneOptions?: FindOneOptions<Step>): Promise<Step | null>;
  save(step: Step): Promise<Step>;
}
