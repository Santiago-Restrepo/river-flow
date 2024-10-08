import { Injectable } from '@nestjs/common';
import { VariableRepository } from '../domain/variable.repository';
import { Variable } from '../domain/variable.entity';
import Block from 'src/modules/block/domain/block.entity';

@Injectable()
export class VariableService {
  constructor(private readonly variableRepository: VariableRepository) {}

  findAvailable() {
    return this.variableRepository.find();
  }

  createFromBlockOutput(block: Block, object: any) {
    const prefix = `block_${block.id}_output`;
    const flatObject = this.#flatObject(object, prefix);
    const variables = this.#flatObjectToVariables(block, flatObject);
    return this.variableRepository.save(variables);
  }

  #flatObjectToVariables(block: Block, object: any) {
    return Object.keys(object).map((key) => {
      const value = object[key];
      const variable = new Variable();
      variable.key = key;
      variable.value = value;
      variable.block = block;
      return variable;
    });
  }

  #flatObject(obj: any, prefix = '') {
    const result = {};
    const stack = [{ parentKey: prefix, value: obj }];

    while (stack.length > 0) {
      const { parentKey, value } = stack.pop();

      if (typeof value === 'object' && !Array.isArray(value)) {
        // If it's an object, push its properties to the stack
        for (const key in value) {
          if (value.hasOwnProperty(key)) {
            const newKey = parentKey ? `${parentKey}.${key}` : key;
            stack.push({ parentKey: newKey, value: value[key] });
          }
        }
      } else if (Array.isArray(value)) {
        // Handle arrays by appending the index
        value.forEach((item, index) => {
          const arrayKey = `${parentKey}.${index + 1}`;
          stack.push({ parentKey: arrayKey, value: item });
        });
      } else {
        // If it's a primitive value, store it
        result[parentKey] = value;
      }
    }

    return result;
  }
}
