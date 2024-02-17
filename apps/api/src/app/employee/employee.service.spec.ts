import {
  mockEmployee,
  mockEmployees,
  createMockEmployeeDto,
} from './../../mock/employee';
import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeService } from './employee.service';
import { PrismaService } from '../prisma.service';
import { payment_type, role } from '@prisma/client';
import { BadRequestException } from '@nestjs/common';
import { mockUser } from '@ocmi/api/mock/users';

describe('EmployeeService', () => {
  let service: EmployeeService;

  const mockPrismaService = {
    employee: {
      findMany: jest.fn((options: {}) => {
        return mockEmployees;
      }),
      findUnique: jest.fn((options: { where: { id: number } }) => {
        const user = mockEmployees.find((user) => user.id === options.where.id);
        return user;
      }),
      create: jest.fn((options: { data: { name: string } }) => {
        return mockEmployee;
      }),
      update: jest.fn(
        (options: { where: { id: number }; data: { name: string } }) => {
          return mockEmployee;
        },
      ),

      delete: jest.fn((options: { where: { id: number } }) => {
        return mockEmployee;
      }),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmployeeService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<EmployeeService>(EmployeeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an employee', async () => {
    const result = await service.create(mockEmployee);

    expect(result).toEqual(mockEmployee);

    expect(mockPrismaService.employee.create).toHaveBeenCalledTimes(1);

    const expected_data = {
      ...createMockEmployeeDto,
      enterprise: {
        connect: {
          id: createMockEmployeeDto.enterprise_id,
        },
      },
    };

    // Remove the enterprise_id key from expected_data
    delete expected_data.enterprise_id;

    expect(mockPrismaService.employee.create).toHaveBeenCalledWith({
      data: expected_data,
    });
  });

  it('should throw an error when creating an employee with invalid payment rate', async () => {
    const invalidEmployee = {
      ...createMockEmployeeDto,
      payment_type: payment_type.SALARY,
      payment_rate: 200,
    };

    const result = await service.create(invalidEmployee);

    expect(result).toBeInstanceOf(BadRequestException);
  });

  it('should throw an error when creating an employee with invalid payment rate', async () => {
    const invalidEmployee = {
      ...createMockEmployeeDto,
      payment_type: payment_type.HOURLY,
      payment_rate: 5,
    };

    const result = await service.create(invalidEmployee);

    expect(result).toBeInstanceOf(BadRequestException);
  })

  it('should find all employees', async () => {
    const result = await service.findAll(role.ADMIN, 1);

    expect(result).toEqual(mockEmployees);

    expect(mockPrismaService.employee.findMany).toHaveBeenCalledTimes(1);
  });

  it('should find an employee', async () => {
    const result = await service.findOne(1);

    expect(result).toEqual(mockEmployee);

    expect(mockPrismaService.employee.findUnique).toHaveBeenCalledTimes(1);
    expect(mockPrismaService.employee.findUnique).toHaveBeenCalledWith({
      where: { id: mockEmployee.id },
    });
  });

  it('should update an employee', async () => {
    const result = await service.update(1, mockEmployee);

    expect(result).toEqual(mockEmployee);

    expect(mockPrismaService.employee.update).toHaveBeenCalledTimes(1);
    expect(mockPrismaService.employee.update).toHaveBeenCalledWith({
      where: { id: mockEmployee.id },
      data: mockEmployee,
    });
  });

  it('should delete an employee', async () => {
    const result = await service.remove(mockEmployee.id);

    expect(result).toEqual(mockEmployee);

    expect(mockPrismaService.employee.delete).toHaveBeenCalledTimes(1);
    expect(mockPrismaService.employee.delete).toHaveBeenCalledWith({
      where: { id: mockEmployee.id },
    });
  });
});
