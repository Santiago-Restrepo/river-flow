import { Inject, Injectable } from '@nestjs/common';
import { Variable, VariableValue } from '../domain/variable.entity';
import Block from 'src/modules/block/domain/block.entity';
import { VariableRepository } from '../domain/variable.repository';

@Injectable()
export class VariableService {
  constructor(
    @Inject('VariableRepository')
    private readonly variableRepository: VariableRepository,
  ) {}

  findAvailableByBlock(block: Block) {
    return this.variableRepository.findAvailableByBlock(block);
  }

  createFromBlockOutput(block: Block, blockResults: VariableValue) {
    const key = `block_${block.id}_output`;
    const variable = new Variable();
    variable.key = key;
    variable.value = blockResults;
    variable.block = block;
    return this.variableRepository.save(variable);
  }
}
