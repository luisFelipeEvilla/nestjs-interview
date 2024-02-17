import { CreatePaymentsSheetDto } from './../app/payments-sheet/dto/create-payments-sheet.dto';
import { employee_payment, payments_sheet, payments_sheet_states } from '@prisma/client';

export const mockCreatePaymentSheetDto: CreatePaymentsSheetDto = {
  enterprise_id: 1,
};

export const mockEmployeePayment: employee_payment = {
  id: 1,
  employee_id: 1,
  payment_type: 'SALARY',
  payment_rate: 1000,
  timesheet_id: 1,
  units: 1,
};

export const mockEmployeePayments: employee_payment[] = [
  mockEmployeePayment,
  { ...mockEmployeePayment, id: 2 },
  { ...mockEmployeePayment, id: 3 },
];

export const mockPaymentSheet: payments_sheet = {
  id: 1,
  enterprise_id: 1,
  check_date: new Date(),
  created_at: new Date(),
  updated_at: new Date(),
  state: payments_sheet_states.PENDING
};

export const mockPaymentSheets: payments_sheet[] = [
  mockPaymentSheet,
  { ...mockPaymentSheet, id: 2 },
  { ...mockPaymentSheet, id: 3 },
];

export const mockUpdatePaymentSheetDto: CreatePaymentsSheetDto = {
  enterprise_id: 1,
};
