import { UpdateEmployeeDto } from './../employee/dto/update-employee.dto';
import { PrismaModule } from 'nestjs-prisma';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from '../prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { role } from '@prisma/client';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';

describe('UserService', () => {
  let service: UserService;

  const userDto: CreateUserDto = {
    email: 'mock@mock.com',
    name: 'mock',
    password: '123456',
    role: role.ADMIN,
    enterprise_id: 1,
  };

  const updateUserDto: UpdateUserDto = {
    email: "mock@updated.com",
  }

  const mockEnterprise = {
    id: 1,
    name: 'mock',
  };

  const mockEnterprises = [mockEnterprise];

  const mockUser: User = {
    id: 1,
    email: 'mock@mock.com',
    name: 'mock',
    password: '123456',
    role: role.ADMIN,
    enterprise_id: 1,
    enterprise: mockEnterprise,
  };

  const mockUpdatedUser: User = {
    ...mockUser,
    email: 'mock@updated.com'
  }

  const mockUsers: User[] = [
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

  let mockPrismaService = {
    user: {
      findUnique: jest.fn(
        async (options: {
          where: { id: number };
          include: { enterprise: boolean };
        }) => mockUsers.find((user) => user.id === options.where.id),
      ),
      create: jest.fn(async (CreateUserDto: CreateUserDto, user_role: role) => {
        return mockUser;
      }),
      findMany: jest.fn(
        (options: { include: { enterprise?: boolean } }) => mockUsers,
      ),
      update: jest.fn((options: { where: { id: number}, data: { UpdateEmployeeDto }}) => {
        return updateUserDto
      }),
      delete: jest.fn((options: { where: { id: number}}) => {
        return mockUsers.find((user) => user.id === options.where.id);
      }),
    },
    enterprise: {
      findUnique: jest.fn((options: { where: { id: number } }) =>
        mockEnterprises.find(
          (enterprise) => enterprise.id === options.where.id,
        ),
      ),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Create a user as admin', async () => {
    const result = await service.create(userDto, role.ADMIN);

    expect(result).toEqual(mockUser);
    expect(mockPrismaService.user.create).toHaveBeenCalledTimes(1);

    expect(mockPrismaService.enterprise.findUnique).toHaveBeenCalledTimes(1);
    expect(mockPrismaService.enterprise.findUnique).toHaveBeenCalledWith({
      where: { id: userDto.enterprise_id },
    });
  });

  it('Create a user as a normal User', async () => {
    const result = await service.create(userDto, role.USER);

    expect(result).toBeInstanceOf(UnauthorizedException);
  });

  it('fetch users as admin', async () => {
    const result = await service.findAll(role.ADMIN);

    expect(result).toBeDefined();
    expect(result).toEqual(mockUsers);

    expect(mockPrismaService.user.findMany).toHaveBeenCalledTimes(1);
    expect(mockPrismaService.user.findMany).toHaveBeenCalledWith({
      include: { enterprise: true },
    });
  });

  it('fetch users as a normal user', async () => {
    const result = await service.findAll(role.USER);

    expect(result).toBeInstanceOf(UnauthorizedException);
  });

  it('fetch a user as admin', async () => {
    const result = await service.findOne(mockUser.id);

    expect(result).toBeDefined();
    expect(result).toEqual(mockUser);

    expect(mockPrismaService.user.findUnique).toHaveBeenCalledTimes(1);
    expect(mockPrismaService.user.findUnique).toHaveBeenLastCalledWith({
      where: { id: mockUser.id },
      include: { enterprise: true },
    });
  });

  it('update a user as admin', async () =>  {
    const result = await service.update(mockUser.id, updateUserDto, role.ADMIN);

    expect(result).toBeDefined();
    expect(result).toEqual(updateUserDto);

    expect(mockPrismaService.user.update).toHaveBeenCalledTimes(1);
    expect(mockPrismaService.user.update).toHaveBeenCalledWith({
      where: { id: mockUser.id},
      data: updateUserDto
    })
  })

  it('update a user as normal user', async () => {
    const result = await service.update(mockUser.id, updateUserDto, role.USER);

    expect(result).toBeInstanceOf(UnauthorizedException)
  })

  it('delete a user as admin', async() => {
    const result = await service.remove(mockUser.id, role.ADMIN);

    expect(result).toEqual(mockUser);

    expect(mockPrismaService.user.delete).toHaveBeenCalledTimes(1);
    expect(mockPrismaService.user.delete).toHaveBeenCalledWith({
      where: {
        id: mockUser.id
      }
    })
  })

  it('delete a user as a normal user', async() => {
    const result = await service.remove(mockUser.id, role.USER)

    expect(result).toBeInstanceOf(UnauthorizedException);
  });
});
