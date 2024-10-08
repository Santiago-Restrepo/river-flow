import Block from 'src/modules/block/domain/block.entity';
import BaseEntity from 'src/shared/base-entity.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
//Slug with stepId should be unique
export class Variable extends BaseEntity {
  @Column({ type: 'varchar', unique: true, length: 255 })
  key: string;

  @Column({ type: 'varchar', length: 255 })
  value: string;

  @Column({ type: 'int', nullable: true })
  blockId: number | null;

  @ManyToOne(() => Block, (block) => block.variables)
  block: Block;
}
