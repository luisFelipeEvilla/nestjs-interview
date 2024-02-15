import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PaymentsSheetService } from './payments-sheet.service';
import { CreatePaymentsSheetDto } from './dto/create-payments-sheet.dto';
import { UpdatePaymentsSheetDto } from './dto/update-payments-sheet.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('payments-sheet')
@ApiTags('payments-sheet')
export class PaymentsSheetController {
  constructor(private readonly paymentsSheetService: PaymentsSheetService) {}

  @Post()
  create(@Body() createPaymentsSheetDto: CreatePaymentsSheetDto) {
    return this.paymentsSheetService.create(createPaymentsSheetDto);
  }

  @Get()
  findAll() {
    return this.paymentsSheetService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentsSheetService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePaymentsSheetDto: UpdatePaymentsSheetDto,
  ) {
    return this.paymentsSheetService.update(+id, updatePaymentsSheetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentsSheetService.remove(+id);
  }
}
