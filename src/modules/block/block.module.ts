import { Module } from '@nestjs/common';
import { RunBlockService } from './application/run-block.service';
import { BlockRepositoryImpl } from './application/block.repository.impl';
import { VariableModule } from '../variable/variable.module';

@Module({
  imports: [VariableModule],
  providers: [
    RunBlockService,
    {
      provide: 'BlockRepository',
      useClass: BlockRepositoryImpl,
    },
  ],
  exports: [RunBlockService],
})
export class BlockModule {}
