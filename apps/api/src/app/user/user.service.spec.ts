import { mockUser, mockUsers, updateUserDto, userDto } from './../../mock/users';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from '../prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { role } from '@prisma/client';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { mockEnterprises } from '@ocmi/api/mock/enterprise';

describe('UserService', () => {
  let service: UserService;
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

  it("Create a user with a enterprise that doesn't exists", async() => {
    const result = await service.create({ ...userDto, enterprise_id: 999}, role.ADMIN);

    expect(result).toBeInstanceOf(NotFoundException);
  })

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

  it("fetch a user that doesn't exists", async () => {
    const result = await service.findOne(999);

    expect(result).toBeInstanceOf(NotFoundException)
  })

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
