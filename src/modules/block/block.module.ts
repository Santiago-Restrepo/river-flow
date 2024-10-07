import { Module } from '@nestjs/common';
import { RunBlockService } from './application/run-block.service';
import { BlockRepository } from './domain/block.repository';
import { VariableModule } from '../variable/variable.module';

@Module({
  imports: [VariableModule],
  providers: [RunBlockService, BlockRepository],
  exports: [RunBlockService],
})
export class BlockModule {}
