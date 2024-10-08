import Block from 'src/modules/block/domain/block.entity';
import BaseEntity from 'src/shared/base-entity.entity';
import { Column, Entity, Index, ManyToOne } from 'typeorm';

@Entity({ name: 'parameter' })
@Index(['functionParameterKey', 'blockId'], { unique: true })
export class Parameter extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  functionParameterKey: string;

  @Column({ type: 'varchar', length: 255 })
  value: string;

  @Column({ type: 'int' })
  blockId: number;

  @ManyToOne(() => Block, (block) => block.parameters)
  block: Block;
}
