import { Test, TestingModule } from '@nestjs/testing';
import { RunBlockService } from './run-block.service';

describe('BlockService', () => {
  let service: RunBlockService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RunBlockService],
    }).compile();

    service = module.get<RunBlockService>(RunBlockService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
