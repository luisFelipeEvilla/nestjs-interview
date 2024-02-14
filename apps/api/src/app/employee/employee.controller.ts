import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Employee } from './entities/employee.entity';

@Controller('employee')
@ApiTags('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @ApiOkResponse({ type: Employee,  description: 'Employee created successfully' })
  @Post()
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeeService.create(createEmployeeDto);
  }

  @ApiOkResponse({ type: Employee, isArray: true, description: 'List of all employees' })
  @Get()
  @ApiOkResponse({ type: Employee, isArray: true, description: 'List of all employees' })
  findAll() {
    return this.employeeService.findAll();
  }

  @ApiOkResponse({ type: Employee, description: 'Employee details' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeeService.findOne(+id);
  }

  @ApiOkResponse({ type: Employee, description: 'Employee updated' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    return this.employeeService.update(+id, updateEmployeeDto);
  }

  @ApiOkResponse({ type: Employee, description: 'Employee deleted' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeeService.remove(+id);
  }
}
