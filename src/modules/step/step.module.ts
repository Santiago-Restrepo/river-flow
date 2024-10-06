import { Module } from '@nestjs/common';
import { StepService } from './application/step.service';
import { StepRepository } from './domain/step.repository';
import { BlockModule } from '../block/block.module';

@Module({
  imports: [BlockModule],
  providers: [StepService, StepRepository],
  exports: [StepService],
})
export class StepModule {}
