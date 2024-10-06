import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import Block from './block.entity';

@Injectable()
export class BlockRepository extends Repository<Block> {
  constructor(private datasource: DataSource) {
    super(Block, datasource.createEntityManager());
  }
}
