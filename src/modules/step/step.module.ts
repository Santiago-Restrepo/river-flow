import { Module } from '@nestjs/common';
import { RunStepService } from './application/run-step.service';
import { StepRepository } from './domain/step.repository';
import { BlockModule } from '../block/block.module';
import { ResetStepService } from './application/reset-step.service';

@Module({
  imports: [BlockModule],
  providers: [RunStepService, ResetStepService, StepRepository],
  exports: [RunStepService, ResetStepService],
})
export class StepModule {}
