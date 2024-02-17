import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { PaymentsSheetService } from './payments-sheet.service';
import { CreatePaymentsSheetDto } from './dto/create-payments-sheet.dto';
import { UpdatePaymentsSheetDto } from './dto/update-payments-sheet.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../user/entities/user.entity';

@Controller('payments-sheet')
@ApiTags('payments-sheet')
export class PaymentsSheetController {
  constructor(private readonly paymentsSheetService: PaymentsSheetService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  create(
    @Body() createPaymentsSheetDto: CreatePaymentsSheetDto) {
    return this.paymentsSheetService.create(createPaymentsSheetDto);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  findAll(@Req() req: { user: User}){
    return this.paymentsSheetService.findAll(req.user.role, req.user.enterprise_id);
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  findOne(@Req() req: { user: User }, @Param('id') id: string) {
    return this.paymentsSheetService.findOne(+id, req.user.role, req.user.enterprise_id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  update(
    @Req() req: { user: User },
    @Param('id') id: ParseIntPipe,
    @Body() updatePaymentsSheetDto: UpdatePaymentsSheetDto,
  ) {
    return this.paymentsSheetService.update(+id, updatePaymentsSheetDto, req.user.role, req.user.enterprise_id);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  remove(
    @Req() req: { user: User },
    @Param('id') id: ParseIntPipe) {
    return this.paymentsSheetService.remove(+id, req.user.role, req.user.enterprise_id);
  }
}
