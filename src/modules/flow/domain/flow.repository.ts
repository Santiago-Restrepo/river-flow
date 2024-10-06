import { DataSource, Repository } from 'typeorm';
import Flow from './flow.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FlowRepository extends Repository<Flow> {
  constructor(private datasource: DataSource) {
    super(Flow, datasource.createEntityManager());
  }
}
