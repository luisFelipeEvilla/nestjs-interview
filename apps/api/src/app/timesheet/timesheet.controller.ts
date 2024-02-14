import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TimesheetService } from './timesheet.service';
import { CreateTimesheetDto } from './dto/create-timesheet.dto';
import { UpdateTimesheetDto } from './dto/update-timesheet.dto';

@Controller('timesheet')
export class TimesheetController {
  constructor(private readonly timesheetService: TimesheetService) {}

  @Post()
  create(@Body() createTimesheetDto: CreateTimesheetDto) {
    return this.timesheetService.create(createTimesheetDto);
  }

  @Get()
  findAll() {
    return this.timesheetService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.timesheetService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTimesheetDto: UpdateTimesheetDto,
  ) {
    return this.timesheetService.update(+id, updateTimesheetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.timesheetService.remove(+id);
  }
}
