import { CreatePaymentsSheetDto } from './dto/create-payments-sheet.dto';
import { NotFoundException } from '@nestjs/common';
import { mockEmployeePayment, mockPaymentSheet, mockPaymentSheets } from './../../mock/paymentSheet';
import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsSheetService } from './payments-sheet.service';
import { role, employee_payment } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { mockEmployee, mockEmployees } from '@ocmi/api/mock/employee';

describe('PaymentsSheetService', () => {
  let service: PaymentsSheetService;

  const mockPrismaService = {
    payments_sheet: {
      findMany: jest.fn(
        async (options: {
          where: { enterprise_id: number | undefined };
          include: { enterprise: boolean };
        }) => {
          return mockPaymentSheets;
        },
      ),
      findUnique: jest.fn(
        async (options: {
          where: { id: number; enterprise_id: number | undefined };
          include: { employee_payment: { include: { employee: boolean } } };
        }) => {
          const paymentSheet = mockPaymentSheets.find(
            (sheet) => sheet.id === options.where.id,
          );

          if (!paymentSheet)
            return new NotFoundException(
              `Payment sheet with id ${options.where.id} not found`,
            );

          return paymentSheet;
        },
      ),
      create: jest.fn(async (options: { data: CreatePaymentsSheetDto }) => {
        return mockPaymentSheet;
      }),
      update: jest.fn(
        async (options: {
          where: { id: number };
          data: CreatePaymentsSheetDto;
        }) => {
          return mockPaymentSheets;
        },
      ),
      delete: jest.fn(async (options: { where: { id: number } }) => {
        return mockPaymentSheets;
      }),
    },
    employee: {
      findMany: jest.fn(
        async (options: {
          where: { enterprise_Id: number };
        }) => {
          return mockEmployees.filter( employee => employee.enterprise_id === options.where.enterprise_Id);
        },
      ),
    },

    employee_payment: {
      create: jest.fn(
        async (options: {
          data: {
            employee_id: number;
            payment_type: employee_payment['payment_type'];
            payment_rate: number;
            timesheet_id: number;
            units: number;
          };
        }) => {
          return mockEmployeePayment;
        },
      ),
    }
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentsSheetService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<PaymentsSheetService>(PaymentsSheetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a payment sheet', async () => {
    expect(mockPrismaService.payments_sheet.create).toBeDefined();

    const paymentSheet = await service.create(mockPaymentSheet);
    
    expect(paymentSheet).toEqual(mockPaymentSheet);
    expect(mockPrismaService.payments_sheet.create).toHaveBeenCalled();
  
  });

  it('should find all payment sheets', async () => {
    expect(mockPrismaService.payments_sheet.findMany).toBeDefined();
    
    const paymentSheets = await service.findAll(role.ADMIN, mockPaymentSheet.id);

    expect(paymentSheets).toEqual(mockPaymentSheets);
    expect(mockPrismaService.payments_sheet.findMany).toHaveBeenCalled();
  });

  it('should find one payment sheet', async () => {
    expect(mockPrismaService.payments_sheet.findUnique).toBeDefined();

    const paymentSheet = await service.findOne(mockPaymentSheet.id, role.ADMIN, mockPaymentSheet.id);

    expect(paymentSheet).toEqual(mockPaymentSheet);
    expect(mockPrismaService.payments_sheet.findUnique).toHaveBeenCalled();
  });

  it('should delete a payment sheet', async () => {
    expect(mockPrismaService.payments_sheet.delete).toBeDefined();

    const paymentSheet = await service.remove(mockPaymentSheet.id, role.ADMIN, mockPaymentSheet.enterprise_id);

    expect(paymentSheet).toEqual(mockPaymentSheets);
    expect(mockPrismaService.payments_sheet.delete).toHaveBeenCalled();
  })

});
