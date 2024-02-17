import { updateEmployeeDto } from './../../mock/employee';
import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { mockEmployee, mockEmployees } from '@ocmi/api/mock/employee';
import { payment_type } from '@prisma/client';
import { ParseIntPipe } from '@nestjs/common';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { mockUser } from '@ocmi/api/mock/users';

describe('EmployeeController', () => {
  let controller: EmployeeController;

  const mockEmployeeService = {
    create: jest.fn((options: { data: { name: string } }) => {
      return mockEmployee;
    }),
    findAll: jest.fn((options: {}) => {
      return mockEmployees;
    }),
    findOne: jest.fn((id: number) => {
      const user = mockEmployees.find((user) => user.id === id);
      return user;
    }),
    update: jest.fn(
      (id: number, updateEmployeeDto: UpdateEmployeeDto) => {
        return mockEmployee;
      },
    ),
    remove: jest.fn((id: number) => {
      return mockEmployee;
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeController],
      providers: [{
        provide: EmployeeService,
        useValue: mockEmployeeService,
      }],
    }).compile();

    controller = module.get<EmployeeController>(EmployeeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create an employee', async () => {
    const result = await controller.create(mockEmployee);

    expect(result).toEqual(mockEmployee);
  });

  it('should find all employees', async () => {
    const result = await controller.findAll({ user: mockUser });

    expect(result).toEqual(mockEmployees);
  });

  it('should find an employee', async () => {
    const result = await controller.findOne(mockEmployee.id as unknown as ParseIntPipe);

    expect(result).toEqual(mockEmployee);
  });

  it('should update an employee', async () => {
    const result = await controller.update(mockEmployee.id as unknown as ParseIntPipe, mockEmployee);

    expect(result).toEqual(mockEmployee);
  });

  it('should delete an employee', async () => {
    const result = await controller.remove(mockEmployee.id as unknown as ParseIntPipe);

    expect(result).toEqual(mockEmployee);
  });

  it('should throw an error when creating an employee with invalid payment rate', async () => {
    const invalidEmployee = {
      ...mockEmployee,
      payment_type: payment_type.SALARY,
      payment_rate: 200,
    };

    try {
      await controller.create(invalidEmployee);
    } catch (error) {
      expect(error.message).toBe('Minimum payment rate for salary is 480');
    }
  });
});
