import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StepModule } from './modules/step/step.module';
import { FlowModule } from './modules/flow/flow.module';
import { BlockModule } from './modules/block/block.module';
import { VariableModule } from './modules/variable/variable.module';
import { FunctionBlockModule } from './modules/function-block/function-block.module';
import { ParameterModule } from './modules/parameter/parameter.module';
import typeormModule from './config/typeorm.module';
import configModule from './config/config.module';

@Module({
  imports: [
    configModule,
    typeormModule,
    StepModule,
    FlowModule,
    BlockModule,
    VariableModule,
    FunctionBlockModule,
    ParameterModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
