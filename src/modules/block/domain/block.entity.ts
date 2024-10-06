import Step from 'src/modules/step/domain/step.entity';
import BaseEntity from 'src/shared/base-entity.entity';
import { Column, Entity, OneToOne } from 'typeorm';

@Entity()
export default class Block extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column('varchar', { length: 255 })
  functionName: string;

  @Column('jsonb')
  parameters: Record<string, string>;

  @OneToOne(() => Step, (step) => step.block)
  step: Step;
}
