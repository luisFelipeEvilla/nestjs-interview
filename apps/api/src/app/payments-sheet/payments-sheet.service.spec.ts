import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsSheetService } from './payments-sheet.service';

describe('PaymentsSheetService', () => {
  let service: PaymentsSheetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentsSheetService],
    }).compile();

    service = module.get<PaymentsSheetService>(PaymentsSheetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
