import { Module } from '@nestjs/common';
import { FlowExecutionRepositoryImpl } from './application/flow-execution.repository.impl';

@Module({
  providers: [
    {
      provide: 'FlowExecutionRepository',
      useClass: FlowExecutionRepositoryImpl,
    },
  ],
})
export class FlowExecutionModule {}
