import { Module } from '@nestjs/common';
import { RunStepService } from './application/run-step.service';
import { BlockModule } from '../block/block.module';
import { ResetStepService } from './application/reset-step.service';
import { StepRepositoryImpl } from './application/step.repository.impl';

@Module({
  imports: [BlockModule],
  providers: [
    RunStepService,
    ResetStepService,
    {
      provide: 'StepRepository',
      useClass: StepRepositoryImpl,
    },
  ],
  exports: [RunStepService, ResetStepService],
})
export class StepModule {}
