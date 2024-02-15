import { PartialType } from '@nestjs/swagger';
import { CreatePaymentsSheetDto } from './create-payments-sheet.dto';

export class UpdatePaymentsSheetDto extends PartialType(
  CreatePaymentsSheetDto,
) {}
