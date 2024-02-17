import { PartialType } from '@nestjs/swagger';
import { CreatePaymentsSheetDto } from './create-payments-sheet.dto';
import { employee_payment, payments_sheet_states } from '@prisma/client';
import { ApiProperty} from '@nestjs/swagger';
import { IsDate, IsObject } from 'class-validator';

export class UpdatePaymentsSheetDto extends PartialType(
  CreatePaymentsSheetDto,
) {
  @ApiProperty()
  @IsDate()
  check_date: string;

  @ApiProperty()
  employee_payment: employee_payment[];
  
  @ApiProperty()
  state: payments_sheet_states

}
