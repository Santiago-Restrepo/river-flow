import Block from 'src/modules/block/domain/block.entity';
import Flow from 'src/modules/flow/domain/flow.entity';
import StepExecution from 'src/modules/step-execution/step-execution.entity';
import BaseEntity from 'src/shared/base-entity.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';

@Entity()
export default class Step extends BaseEntity {
  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'int' })
  order: number;

  @Column('int')
  blockId: number;

  @Column('int')
  flowId: number;

  @OneToOne(() => Block, (block) => block.step)
  @JoinColumn()
  block: Block;

  @ManyToOne(() => Flow, (flow) => flow.steps)
  flow: Flow;

  @OneToMany(() => StepExecution, (stepExecution) => stepExecution.step)
  stepExecutions: StepExecution[];
}
