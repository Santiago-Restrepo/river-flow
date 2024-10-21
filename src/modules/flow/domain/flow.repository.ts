import { EntityManager, FindOneOptions, FindOptionsWhere } from 'typeorm';
import Flow from './flow.entity';

export interface FlowRepository {
  manager: EntityManager;
  findOneBy(
    where: FindOptionsWhere<Flow> | FindOptionsWhere<Flow>[],
  ): Promise<Flow | null>;
  findOne(findOneOptions?: FindOneOptions<Flow>): Promise<Flow | null>;
  save(flow: Flow): Promise<Flow>;
}
