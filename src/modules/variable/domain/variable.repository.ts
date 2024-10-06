import { DataSource, Repository } from 'typeorm';
import { Variable } from './variable.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class VariableRepository extends Repository<Variable> {
  constructor(private datasource: DataSource) {
    super(Variable, datasource.createEntityManager());
  }
}
