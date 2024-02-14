import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  ParseIntPipe,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Employee } from './entities/employee.entity';
import { NotFoundError } from 'rxjs';

@Controller('employee')
@ApiTags('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @ApiOkResponse({ type: Employee,  description: 'Employee created successfully' })
  @Post()
  async create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return await this.employeeService.create(createEmployeeDto);
  }

  @ApiOkResponse({ type: Employee, isArray: true, description: 'List of all employees' })
  @Get()
  @ApiOkResponse({ type: Employee, isArray: true, description: 'List of all employees' })
  async findAll() {
    return await this.employeeService.findAll();
  }

  @ApiOkResponse({ type: Employee, description: 'Employee details' })
  @Get(':id')
  async findOne(@Param('id') id: ParseIntPipe) {
    const employee = await this.employeeService.findOne(+id);

    if (!employee) return new NotFoundException(`Employee with id ${id} not found`);

    return employee;
  }

  @ApiOkResponse({ type: Employee, description: 'Employee updated' })
  @Patch(':id')
  update(
    @Param('id') id: ParseIntPipe,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    return this.employeeService.update(+id, updateEmployeeDto);
  }

  @ApiOkResponse({ type: Employee, description: 'Employee deleted' })
  @Delete(':id')
  async remove(@Param('id') id: ParseIntPipe) {
    const removed = await this.employeeService.remove(+id);
  
    console.log(removed);

    return removed;
  }
}
