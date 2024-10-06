import { Module } from '@nestjs/common';
import { BlockService } from './application/block.service';
import { BlockRepository } from './domain/block.repository';

@Module({
  providers: [BlockService, BlockRepository],
  exports: [BlockService],
})
export class BlockModule {}
