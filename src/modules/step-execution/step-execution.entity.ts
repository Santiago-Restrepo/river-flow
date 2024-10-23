import Step from 'src/modules/step/domain/step.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import ExecutionStatus from 'src/shared/enums/execution-status.enum'; // Enum for execution status
import BaseEntity from 'src/shared/base-entity.entity';
import FlowExecution from '../flow-execution/domain/flow-execution.entity';

@Entity()
export default class StepExecution extends BaseEntity {
  @Column('int')
  stepId: number;

  @Column('int')
  flowExecutionId: number;

  @Column({
    type: 'enum',
    enum: ExecutionStatus,
    default: ExecutionStatus.PENDING,
  })
  executionStatus: ExecutionStatus;

  @Column({ type: 'text', nullable: true })
  log: string; // Stores logs or additional info for debugging

  @Column({ type: 'text', nullable: true })
  error: string | null; // Stores error messages if execution fails

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  startedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  finishedAt: Date | null;

  @ManyToOne(() => Step, (step) => step.stepExecutions)
  @JoinColumn({ name: 'stepId' })
  step: Step;

  @ManyToOne(
    () => FlowExecution,
    (flowExecution) => flowExecution.stepExecutions,
  )
  @JoinColumn({ name: 'flowExecutionId' })
  flowExecution: FlowExecution;
}
