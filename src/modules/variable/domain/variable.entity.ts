import Flow from 'src/modules/flow/domain/flow.entity';
import Step from 'src/modules/step/domain/step.entity';
import BaseEntity from 'src/shared/base-entity.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
//Slug with stepId should be unique
export class Variable extends BaseEntity {
  @Column({ type: 'varchar', unique: true, length: 255 })
  slug: string;

  @Column({ type: 'varchar', length: 255 })
  value: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'int' })
  flowId: number;

  @Column({ type: 'int' })
  stepId: number;

  @ManyToOne(() => Flow, (flow) => flow.variables)
  flow: Flow;

  @ManyToOne(() => Step, (step) => step.variables)
  step: Step;
}
