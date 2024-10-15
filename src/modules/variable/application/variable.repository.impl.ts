import { DataSource, Repository } from 'typeorm';
import { Variable } from '../domain/variable.entity';
import { Injectable } from '@nestjs/common';
import Block from 'src/modules/block/domain/block.entity';
import { VariableRepository } from '../domain/variable.repository';

@Injectable()
export class VariableRepositoryImpl
  extends Repository<Variable>
  implements VariableRepository
{
  constructor(private datasource: DataSource) {
    super(Variable, datasource.createEntityManager());
  }

  findAvailableByBlock(block: Block): Promise<Variable[]> {
    const query = `SELECT variable.*
FROM variable
INNER JOIN block on variable.block_id = block.id
INNER JOIN step on block.step_id = step.id AND step.order <= $1 and step.flow_id = $2`;
    return this.query(query, [block.step.order, block.step.flowId]);
  }
}
