import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsSheetController } from './payments-sheet.controller';
import { PaymentsSheetService } from './payments-sheet.service';

describe('PaymentsSheetController', () => {
  let controller: PaymentsSheetController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentsSheetController],
      providers: [PaymentsSheetService],
    }).compile();

    controller = module.get<PaymentsSheetController>(PaymentsSheetController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
