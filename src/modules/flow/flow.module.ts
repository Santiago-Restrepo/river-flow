import { Module } from '@nestjs/common';
import { FlowService } from './application/flow.service';
import { StepModule } from '../step/step.module';
import { VariableModule } from '../variable/variable.module';
import { FlowRepository } from './domain/flow.repository';
import { FlowController } from './infrastructure/flow.controller';

@Module({
  imports: [StepModule, VariableModule],
  providers: [FlowService, FlowRepository],
  controllers: [FlowController],
})
export class FlowModule {}
