import { Controller, Param, ParseIntPipe, Post } from '@nestjs/common';
import { FlowService } from '../application/flow.service';

@Controller('flow')
export class FlowController {
  constructor(private readonly flowService: FlowService) {}

  @Post('run/:id')
  async run(@Param('id', ParseIntPipe) id: number) {
    return this.flowService.run(id);
  }
}
