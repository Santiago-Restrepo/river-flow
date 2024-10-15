import { Module } from '@nestjs/common';
import { VariableService } from './application/variable.service';
import { VariableRepositoryImpl } from './application/variable.repository.impl';

@Module({
  providers: [
    VariableService,
    {
      provide: 'VariableRepository',
      useClass: VariableRepositoryImpl,
    },
  ],
  exports: [VariableService],
})
export class VariableModule {}
