import { DataSource, Repository } from 'typeorm';
import Flow from '../domain/flow.entity';
import { Injectable } from '@nestjs/common';
import { FlowRepository } from '../domain/flow.repository';

@Injectable()
export class FlowRepositoryImpl
  extends Repository<Flow>
  implements FlowRepository
{
  constructor(private datasource: DataSource) {
    super(Flow, datasource.createEntityManager());
  }
}
