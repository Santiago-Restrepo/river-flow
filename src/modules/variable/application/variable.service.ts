import { Injectable } from '@nestjs/common';
import { VariableRepository } from '../domain/variable.repository';
import { Variable, VariableValue } from '../domain/variable.entity';
import Block from 'src/modules/block/domain/block.entity';

@Injectable()
export class VariableService {
  constructor(private readonly variableRepository: VariableRepository) {}

  findAvailable() {
    return this.variableRepository.find();
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
