import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import Step from '../domain/step.entity';
import { StepRepository } from '../domain/step.repository';

@Injectable()
export class StepRepositoryImpl
  extends Repository<Step>
  implements StepRepository
{
  constructor(private datasource: DataSource) {
    super(Step, datasource.createEntityManager());
  }
}
