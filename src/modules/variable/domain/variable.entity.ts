import Flow from 'src/modules/flow/domain/flow.entity';
import BaseEntity from 'src/shared/base-entity.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Variable extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  value: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'int' })
  flowId: number;

  @ManyToOne(() => Flow, (flow) => flow.variables)
  flow: Flow;
}
