import { EntityManager } from 'typeorm';
import FlowExecution from './flow-execution.entity';

export interface FlowExecutionRepository {
  manager: EntityManager;
  createExecution(
    flowExecution: Partial<FlowExecution>,
  ): Promise<FlowExecution>;
  runExecution(flowExecution: FlowExecution): Promise<FlowExecution>;
}
