import { Test, TestingModule } from '@nestjs/testing';
import { RunFlowService } from './run-flow.service';

describe('FlowService', () => {
  let service: RunFlowService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RunFlowService],
    }).compile();

    service = module.get<RunFlowService>(RunFlowService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
