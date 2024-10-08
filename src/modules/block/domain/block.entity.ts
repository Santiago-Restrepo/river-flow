import { FunctionBlock } from 'src/modules/function-block/domain/function-block.entity';
import { Parameter } from 'src/modules/parameter/domain/parameter.entity';
import Step from 'src/modules/step/domain/step.entity';
import { Variable } from 'src/modules/variable/domain/variable.entity';
import BaseEntity from 'src/shared/base-entity.entity';
import { Column, Entity, ManyToOne, OneToMany, OneToOne } from 'typeorm';

enum BlockType {
  FUNCTION = 'FUNCTION',
}
@Entity()
export default class Block extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'enum', enum: BlockType })
  type: BlockType;

  @Column({ type: 'int', nullable: true })
  functionBlockId: number | null;

  @ManyToOne(() => FunctionBlock)
  functionBlock: FunctionBlock;

  @OneToOne(() => Step, (step) => step.block)
  step: Step;

  @OneToMany(() => Variable, (variable) => variable.block)
  variables: Variable[];

  @OneToMany(() => Parameter, (parameter) => parameter.block)
  parameters: Parameter[];
}
