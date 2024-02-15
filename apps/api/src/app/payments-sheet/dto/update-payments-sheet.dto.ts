import { PartialType } from '@nestjs/swagger';
import { CreatePaymentsSheetDto } from './create-payments-sheet.dto';
import { employee_payment } from '@prisma/client';

export class UpdatePaymentsSheetDto extends PartialType(
  CreatePaymentsSheetDto,
) {
  check_date: string;
  employee_payment: employee_payment[];
}
