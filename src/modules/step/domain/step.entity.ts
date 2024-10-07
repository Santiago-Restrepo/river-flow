import Block from 'src/modules/block/domain/block.entity';
import Flow from 'src/modules/flow/domain/flow.entity';
import { Variable } from 'src/modules/variable/domain/variable.entity';
import BaseEntity from 'src/shared/base-entity.entity';
import ProcessStatus from 'src/shared/enums/process-status.enum';
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

  @Column({ type: 'enum', enum: ProcessStatus, default: ProcessStatus.PENDING })
  status: ProcessStatus;

  @Column({ type: 'text', nullable: true })
  errorMessage: string | null;

  @Column('int')
  blockId: number;

  @Column('int')
  flowId: number;

  @OneToOne(() => Block, (block) => block.step)
  @JoinColumn()
  block: Block;

  @ManyToOne(() => Flow, (flow) => flow.steps)
  flow: Flow;

  @OneToMany(() => Variable, (variable) => variable.step)
  variables: Variable[];
}
