import { Injectable } from '@nestjs/common';
import { VariableRepository } from '../domain/variable.repository';
import { Variable } from '../domain/variable.entity';
import Step from 'src/modules/step/domain/step.entity';

@Injectable()
export class VariableService {
  constructor(private readonly variableRepository: VariableRepository) {}

  createFromObject(step: Step, object: any) {
    const flatObject = this.#flatObject(object);
    const variables = this.#flatObjectToVariables(step, flatObject);
    return this.variableRepository.save(variables);
  }

  #flatObjectToVariables(step: Step, object: any) {
    return Object.keys(object).map((key) => {
      const value = object[key];
      const variable = new Variable();
      variable.slug = key;
      variable.value = value;
      variable.flowId = step.flowId;
      variable.stepId = step.id;
      return variable;
    });
  }

  #flatObject(obj: any) {
    const result = {};
    const stack = [{ parentKey: '', value: obj }];

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
