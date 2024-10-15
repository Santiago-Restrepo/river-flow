import Block from 'src/modules/block/domain/block.entity';
import BaseEntity from 'src/shared/base-entity.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
export type VariableValue = object | string | number | null;
@Entity()
//Slug with stepId should be unique
export class Variable extends BaseEntity {
  @Column({ type: 'varchar', unique: true, length: 255 })
  key: string;

  @Column({ type: 'jsonb', nullable: true })
  value: VariableValue;

  @Column({ type: 'int', nullable: true })
  blockId: number | null;

  @ManyToOne(() => Block, (block) => block.variables)
  block: Block;
}
