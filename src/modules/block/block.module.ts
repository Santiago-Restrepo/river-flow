import { Module } from '@nestjs/common';
import { BlockService } from './application/block.service';

@Module({
  providers: [BlockService],
})
export class BlockModule {}
