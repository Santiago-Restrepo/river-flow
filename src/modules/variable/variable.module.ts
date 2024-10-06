import { Module } from '@nestjs/common';
import { VariableService } from './application/variable.service';

@Module({
  providers: [VariableService],
  exports: [VariableService],
})
export class VariableModule {}
