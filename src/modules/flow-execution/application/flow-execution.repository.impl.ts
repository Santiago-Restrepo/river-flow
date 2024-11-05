import { DataSource, DeepPartial, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import FlowExecution from '../domain/flow-execution.entity';
import { FlowExecutionRepository } from '../domain/flow-execution.repository';
import ExecutionStatus from 'src/shared/enums/execution-status.enum';

@Injectable()
export class FlowExecutionRepositoryImpl
  extends Repository<FlowExecution>
  implements FlowExecutionRepository
{
  constructor(private datasource: DataSource) {
    super(FlowExecution, datasource.createEntityManager());
  }

  createExecution(
    flowExecution: DeepPartial<FlowExecution>,
  ): Promise<FlowExecution> {
    const flow = this.create(flowExecution);
    return this.save(flow);
  }

  runExecution(flowExecution: FlowExecution): Promise<FlowExecution> {
    flowExecution.status = ExecutionStatus.RUNNING;
    return this.save(flowExecution);
  }
}
