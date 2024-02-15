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
  UseGuards,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { ApiBearerAuth, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { Employee } from './entities/employee.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('employee')
@ApiTags('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  @ApiOkResponse({ type: Employee,  description: 'Employee created successfully' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return await this.employeeService.create(createEmployeeDto);
  }

  @Get()
  @ApiOkResponse({ type: Employee, isArray: true, description: 'List of all employees' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async findAll() {
    return await this.employeeService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: Employee, description: 'Employee details' })
  @ApiParam({ name: 'id', type: Number })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async findOne(@Param('id') id: ParseIntPipe) {
    const employee = await this.employeeService.findOne(+id);

    if (!employee) return new NotFoundException(`Employee with id ${id} not found`);

    return employee;
  }

  @Patch(':id')
  @ApiOkResponse({ type: Employee, description: 'Employee updated' })
  @ApiParam({ name: 'id', type: Number })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  update(
    @Param('id') id: ParseIntPipe,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    return this.employeeService.update(+id, updateEmployeeDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: Employee, description: 'Employee deleted' })
  @ApiParam({ name: 'id', type: Number })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async remove(@Param('id') id: ParseIntPipe) {
    const removed = await this.employeeService.remove(+id);
  
    return removed;
  }
}
