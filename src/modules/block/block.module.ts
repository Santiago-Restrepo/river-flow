import { Module } from '@nestjs/common';
import { BlockService } from './application/block.service';
import { BlockRepository } from './domain/block.repository';
import { VariableModule } from '../variable/variable.module';

@Module({
  imports: [VariableModule],
  providers: [BlockService, BlockRepository],
  exports: [BlockService],
})
export class BlockModule {}
