import { Variable } from '../domain/variable.entity';
import Block from 'src/modules/block/domain/block.entity';

export interface VariableRepository {
  findAvailableByBlock(block: Block): Promise<Variable[]>;

  save(variable: Variable): Promise<Variable>;
}
