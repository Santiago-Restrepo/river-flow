import { Test, TestingModule } from '@nestjs/testing';
import { RunStepService } from './run-step.service';

describe('StepService', () => {
  let service: RunStepService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RunStepService],
    }).compile();

    service = module.get<RunStepService>(RunStepService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
