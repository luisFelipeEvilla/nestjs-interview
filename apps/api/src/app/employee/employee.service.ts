import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class EmployeeService {
  constructor (private prisma: PrismaService) {}
  
  async create(createEmployeeDto: CreateEmployeeDto) {
    if (createEmployeeDto.payment_type === 'SALARY' && createEmployeeDto.payment_rate < 480) {
      return new BadRequestException('Minimum payment rate for salary is 480');
    }

    if (createEmployeeDto.payment_type === 'HOURLY' && createEmployeeDto.payment_rate < 12) {
      return new BadRequestException('Minimum payment rate for hourly is 12');
    }

    const employee = await this.prisma.employee.create({
      data: {
        name: createEmployeeDto.name,
        email: createEmployeeDto.email,
        payment_type: createEmployeeDto.payment_type,
        payment_rate: createEmployeeDto.payment_rate,
        enterprise: {
          connect: {
            id: createEmployeeDto.enterprise_id,
          },
        },
      }
    });

    return employee;
  }

  async findAll() {
    const employees = await this.prisma.employee.findMany();

    return employees;
  }

  async findOne(id: number) {
    const employee = await this.prisma.employee.findUnique({
      where: { id },
    });

    return employee;
  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    const employee = await this.prisma.employee.update({
      where: { id },
      data: updateEmployeeDto,
    });

    return employee;
  }

  async remove(id: number) {
    const employee = await this.prisma.employee.delete({
      where: { id },
    });

    return employee;
  }
}
