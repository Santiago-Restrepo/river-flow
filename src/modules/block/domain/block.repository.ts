import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import Block from './block.entity';

@Injectable()
export class BlockRepository extends Repository<Block> {}
