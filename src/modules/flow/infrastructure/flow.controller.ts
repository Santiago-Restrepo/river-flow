import { Controller, Param, ParseIntPipe, Post } from '@nestjs/common';
import { RunFlowService } from '../application/run-flow.service';
import { RetryFlowService } from '../application/retry-flow.service';

@Controller('flow')
export class FlowController {
  constructor(
    private readonly runFlowService: RunFlowService,
    private readonly retryFlowService: RetryFlowService,
  ) {}

  @Post('run/:id')
  async run(@Param('id', ParseIntPipe) id: number) {
    return this.runFlowService.run(id);
  }

  @Post('retry/:id')
  async retry(@Param('id', ParseIntPipe) id: number) {
    return this.retryFlowService.retry(id);
  }
}
