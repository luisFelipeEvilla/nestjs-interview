import { CreatePaymentsSheetDto } from './dto/create-payments-sheet.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsSheetController } from './payments-sheet.controller';
import { PaymentsSheetService } from './payments-sheet.service';
import {
  mockPaymentSheet,
  mockPaymentSheets,
} from '@ocmi/api/mock/paymentSheet';
import { role } from '@prisma/client';
import { User } from '../user/entities/user.entity';
import { mockUser } from '@ocmi/api/mock/users';

describe('PaymentsSheetController', () => {
  let controller: PaymentsSheetController;

  const userReq = { user: { ...mockUser, role: role.ADMIN } };
  const adminReq = { user: { ...mockUser, role: role.USER } };

  const mockPaymentsSheetService = {
    create: jest.fn(async (data: CreatePaymentsSheetDto) => {
      return mockPaymentSheet;
    }),
    findAll: jest.fn(async (req: { user: User}) => {
      return [mockPaymentSheet];
    }),
    findOne: jest.fn(async (id: number) => {
      return mockPaymentSheets.find((sheet) => sheet.id === id);
    }),
    update: jest.fn(async (id: number, data: CreatePaymentsSheetDto) => {
      return mockPaymentSheet;
    }),
    remove: jest.fn(async (id: number) => {
      return mockPaymentSheet;
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentsSheetController],
      providers: [{
        provide: PaymentsSheetService,
        useValue: mockPaymentsSheetService,
      }],
    }).compile();

    controller = module.get<PaymentsSheetController>(PaymentsSheetController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a payment sheet', async () => {
    expect(mockPaymentsSheetService.create).toBeDefined();

    await controller.create({ enterprise_id: 1 });

    expect(mockPaymentsSheetService.create).toHaveBeenCalled();
  });

  it('should find all payment sheets', async () => {
    expect(mockPaymentsSheetService.findAll).toBeDefined();

    await controller.findAll(adminReq);

    expect(mockPaymentsSheetService.findAll).toHaveBeenCalled();
  });

  it('should find one payment sheet', async () => {
    expect(mockPaymentsSheetService.findOne).toBeDefined();

    await controller.findOne(adminReq, mockPaymentSheet.id as unknown as string);

    expect(mockPaymentsSheetService.findOne).toHaveBeenCalled();
  });
});
