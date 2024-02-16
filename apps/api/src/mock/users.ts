import { role } from "@prisma/client";
import { CreateUserDto } from "../app/user/dto/create-user.dto";
import { UpdateUserDto } from "../app/user/dto/update-user.dto";
import { User } from "../app/user/entities/user.entity";
import { mockEnterprise } from "./enterprise";

export const userDto: CreateUserDto = {
    email: 'mock@mock.com',
    name: 'mock',
    password: '123456',
    role: role.ADMIN,
    enterprise_id: mockEnterprise.id,
  };

  export const updateUserDto: UpdateUserDto = {
    email: "mock@updated.com",
  }

  export const mockUser: User = {
    id: 1,
    email: 'mock@mock.com',
    name: 'mock',
    password: '123456',
    role: role.ADMIN,
    enterprise_id: mockEnterprise.id,
    enterprise: mockEnterprise,
  };

  export const mockUpdatedUser: User = {
    ...mockUser,
    email: 'mock@updated.com'
  }

  export const mockUsers: User[] = [
    mockUser,
    {
      ...mockUser,
      enterprise_id: 2,
      enterprise: {
        id: 2,
        name: 'mock 2',
      },
    },
  ];