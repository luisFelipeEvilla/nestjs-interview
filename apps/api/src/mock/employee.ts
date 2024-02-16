import { CreateEmployeeDto } from '../app/employee/dto/create-employee.dto';
import { mockEnterprise } from './enterprise';

export const createMockEmployeeDto: CreateEmployeeDto = {
  name: 'mock',
  payment_type: 'HOURLY',
  payment_rate: 12,
  enterprise_id: mockEnterprise.id,
  email: 'mock@mock.com',
};

export const mockEmployee = {
  id: 1,
  ...createMockEmployeeDto,
};

export const mockEmployees = [
  mockEmployee,
  { ...mockEmployee, id: 2 },
  { ...mockEmployee, id: 3 },
];

export const updateEmployeeDto = {
  name: 'mock',
  payment_type: 'SALARY',
  payment_rate: 480,
  enterprise_id: mockEnterprise.id,
  email: 'mock@updated.com',
};

export const mockUpdatedEmployee = {
  id: 1,
  ...updateEmployeeDto,
};
