import { Module } from '@nestjs/common';
import { VariableService } from './application/variable.service';
import { VariableRepository } from './domain/variable.repository';

@Module({
  providers: [VariableService, VariableRepository],
  exports: [VariableService],
})
export class VariableModule {}
