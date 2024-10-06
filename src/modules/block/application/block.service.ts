import { Injectable } from '@nestjs/common';
import functions, { BlockFunctions } from './functions';
import { BlockRepository } from '../domain/block.repository';
import Block from '../domain/block.entity';
import { Variable } from 'src/modules/variable/domain/variable.entity';

@Injectable()
export class BlockService {
  functions: BlockFunctions;
  constructor(private readonly blockRepository: BlockRepository) {
    this.functions = functions;
  }

  async run(id: number, variables: Variable[]) {
    const block = await this.blockRepository.findOneByOrFail({ id });
    const blockFunction = this.#getBlockFunction(block);
    const evaluatedParams = this.#evaluateParams(block, variables);

    return blockFunction(evaluatedParams);
  }

  #getBlockFunction(block: Block) {
    const { functionName } = block;

    return this.functions[functionName];
  }

  #evaluateParams(block: Block, variables: Variable[]) {
    const { parameters } = block;

    return Object.entries(parameters).reduce((acc, [key, value]) => {
      const variable = variables.find((variable) => variable.name === value);
      return { ...acc, [key]: variable.value };
    }, {});
  }
}
