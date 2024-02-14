import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class EmployeeService {
  constructor (private prisma: PrismaService) {}
  
  async create(createEmployeeDto: CreateEmployeeDto) {
    const employee = await this.prisma.employee.create({
      data: {
        name: createEmployeeDto.name,
        email: createEmployeeDto.email,
        payment_type: createEmployeeDto.payment_type,
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
