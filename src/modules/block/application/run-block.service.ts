import { Injectable } from '@nestjs/common';
import functions, { BlockFunctions } from './functions';
import { BlockRepository } from '../domain/block.repository';
import Block from '../domain/block.entity';
import { Variable } from 'src/modules/variable/domain/variable.entity';
import { VariableService } from 'src/modules/variable/application/variable.service';
import Handlebars from 'handlebars';

@Injectable()
export class RunBlockService {
  functions: BlockFunctions;
  constructor(
    private readonly blockRepository: BlockRepository,
    private readonly variableService: VariableService,
  ) {
    this.functions = functions;
  }

  async run(id: number, variables: Variable[]) {
    const block = await this.blockRepository.findOneOrFail({
      relations: { step: true },
      where: {
        id,
      },
    });
    const blockFunction = this.#getBlockFunction(block);
    const evaluatedParams = this.#evaluateParams(block, variables);
    const result = await blockFunction(evaluatedParams);
    return this.variableService.createFromObject(block.step, result);
  }

  #getBlockFunction(block: Block) {
    const { functionName } = block;

    return this.functions[functionName];
  }

  #evaluateParams(block: Block, variables: Variable[]) {
    const { parameters } = block;
    const objectFromVariables = this.#objectFromVariables(variables);

    const template = Handlebars.compile(JSON.stringify(parameters))(
      objectFromVariables,
    );

    return JSON.parse(template);
  }

  #objectFromVariables(variables: Variable[]) {
    return variables.reduce((acc, variable) => {
      return { ...acc, [variable.slug]: variable.value };
    }, {});
  }
}
