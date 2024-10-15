import { Injectable } from '@nestjs/common';
import functions, { BlockFunctions } from './functions';
import Block from '../domain/block.entity';
import { VariableService } from 'src/modules/variable/application/variable.service';
import Handlebars from 'handlebars';
import { Parameter } from 'src/modules/parameter/domain/parameter.entity';
import { Variable } from 'src/modules/variable/domain/variable.entity';

@Injectable()
export class RunBlockService {
  functions: BlockFunctions;
  constructor(private readonly variableService: VariableService) {
    this.functions = functions;
  }

  async run(block: Block) {
    const blockFunction = this.#getBlockFunction(block);
    const availableVariables =
      await this.variableService.findAvailableByBlock(block);
    const evaluatedParams = this.#evaluateParams(
      block,
      block.parameters,
      availableVariables,
    );
    const result = await blockFunction(evaluatedParams);
    return this.variableService.createFromBlockOutput(block, result);
  }

  #getBlockFunction(block: Block) {
    const {
      functionBlock: { name: functionName },
    } = block;

    return this.functions[functionName];
  }

  #evaluateParams(
    block: Block,
    parameters: Parameter[],
    availableVariables?: Variable[],
  ) {
    const {
      functionBlock: { parametersTemplate },
    } = block;
    const objectFromVariables = this.#objectFromVariables(availableVariables);
    const objectFromParameters = this.#objectFromParameters(
      parameters,
      objectFromVariables,
    );
    const template = Handlebars.compile(JSON.stringify(parametersTemplate))(
      objectFromParameters,
    );

    return JSON.parse(template);
  }

  #objectFromVariables(variables?: Variable[]) {
    if (!variables) return {};
    return variables.reduce((acc, variable) => {
      return { ...acc, [variable.key]: variable.value };
    }, {});
  }

  #objectFromParameters(
    parameters: Parameter[],
    availableVariablesObj: object,
  ) {
    return parameters.reduce((acc, parameter) => {
      const value = Handlebars.compile(parameter.value)(availableVariablesObj);
      return { ...acc, [parameter.functionParameterKey]: value };
    }, {});
  }
}
