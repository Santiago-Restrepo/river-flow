import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import Block from '../domain/block.entity';
import { BlockRepository } from '../domain/block.repository';

@Injectable()
export class BlockRepositoryImpl
  extends Repository<Block>
  implements BlockRepository
{
  constructor(private datasource: DataSource) {
    super(Block, datasource.createEntityManager());
  }
}
