import { Entity, OneToMany } from 'typeorm';
import BaseEntity from 'src/shared/base-entity.entity';
import Step from 'src/modules/step/domain/step.entity';
import FlowExecution from 'src/modules/flow-execution/domain/flow-execution.entity';

@Entity()
export default class Flow extends BaseEntity {
  @OneToMany(() => Step, (step) => step.flow)
  steps: Step[];

  @OneToMany(() => FlowExecution, (flowExecution) => flowExecution.flow)
  flowExecutions: FlowExecution[];
}
