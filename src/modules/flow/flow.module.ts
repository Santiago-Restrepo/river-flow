import { Module } from '@nestjs/common';
import { RunFlowService } from './application/run-flow.service';
import { StepModule } from '../step/step.module';
import { VariableModule } from '../variable/variable.module';
import { FlowRepositoryImpl } from './application/flow.repository.impl';
import { FlowController } from './infrastructure/flow.controller';
import { RetryFlowService } from './application/retry-flow.service';

@Module({
  imports: [StepModule, VariableModule],
  providers: [
    RunFlowService,
    RetryFlowService,
    {
      provide: 'FlowRepository',
      useClass: FlowRepositoryImpl,
    },
  ],
  controllers: [FlowController],
})
export class FlowModule {}
