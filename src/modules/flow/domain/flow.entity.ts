import { Column, Entity, OneToMany } from 'typeorm';
import BaseEntity from 'src/shared/base-entity.entity';
import ProcessStatus from 'src/shared/enums/process-status.enum';
import Step from 'src/modules/step/domain/step.entity';

@Entity()
export default class Flow extends BaseEntity {
  @Column({ type: 'enum', enum: ProcessStatus, default: ProcessStatus.PENDING })
  status: ProcessStatus;

  @Column({ type: 'text', nullable: true })
  errorMessage: string | null;

  @OneToMany(() => Step, (step) => step.flow)
  steps: Step[];
}
