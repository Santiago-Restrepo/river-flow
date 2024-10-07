import { Module } from '@nestjs/common';
import { RunFlowService } from './application/run-flow.service';
import { StepModule } from '../step/step.module';
import { VariableModule } from '../variable/variable.module';
import { FlowRepository } from './domain/flow.repository';
import { FlowController } from './infrastructure/flow.controller';
import { RetryFlowService } from './application/retry-flow.service';

@Module({
  imports: [StepModule, VariableModule],
  providers: [RunFlowService, RetryFlowService, FlowRepository],
  controllers: [FlowController],
})
export class FlowModule {}
