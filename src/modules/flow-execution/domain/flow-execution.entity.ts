import Flow from 'src/modules/flow/domain/flow.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import BaseEntity from 'src/shared/base-entity.entity';
import ExecutionStatus from 'src/shared/enums/execution-status.enum';
import StepExecution from 'src/modules/step-execution/step-execution.entity';

@Entity()
export default class FlowExecution extends BaseEntity {
  @Column('int')
  flowId: number;

  @Column({
    type: 'enum',
    enum: ExecutionStatus,
    default: ExecutionStatus.PENDING,
  })
  status: ExecutionStatus;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  startedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  finishedAt: Date | null;

  @OneToMany(
    () => StepExecution,
    (stepExecution) => stepExecution.flowExecution,
  )
  stepExecutions: StepExecution[];

  @ManyToOne(() => Flow, (flow) => flow.flowExecutions)
  flow: Flow;
}
