import { PrismaService } from './../prisma.service';
import { Test, TestingModule } from '@nestjs/testing';
import { EnterpriseService } from './enterprise.service';
import { createEnterpriseDto, mockEnterprise, mockUpdatedEnterprise } from '@ocmi/api/mock/enterprise';
import { role } from '@prisma/client';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { mockUpdatedUser, mockUser, mockUsers } from '@ocmi/api/mock/users';

describe('EnterpriseService', () => {
  let service: EnterpriseService;

  const mockPrismaService = {
    enterprise: {
      findUnique: jest.fn((options: { where: { id: number } }) => {
        const user = mockUsers.find((user) => user.id === options.where.id);
        return user;
      }),
      create: jest.fn((options: { data: { name: string } }) => {
        return mockUser;
      }),
      findMany: jest.fn(() => {
        return mockUsers;
      }),
      update: jest.fn(
        (options: { where: { id: number }; data: { name: string } }) => {
          return mockUpdatedEnterprise;
        },
      ),
      delete: jest.fn((options: { where: { id: number } }) => {
        return mockUser;
      }),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EnterpriseService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<EnterpriseService>(EnterpriseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an enterprise', async () => {
    const result = await service.create(createEnterpriseDto, role.ADMIN);

    expect(result).toEqual(mockUser);

    expect(mockPrismaService.enterprise.create).toHaveBeenCalledTimes(1);
    expect(mockPrismaService.enterprise.create).toHaveBeenCalledWith({ data: { ...createEnterpriseDto}});
  });

  it('should return unauthorized exception when creating an enterprise as a user', async () => {
    expect(service.create).toBeDefined();

    const result = await service.create(createEnterpriseDto, role.USER);

    expect(result).toBeDefined();
    expect(result).toBeInstanceOf(UnauthorizedException);
  });

  it('should find an enterprise', async () => {
    const result = await service.findOne(mockEnterprise.id, role.ADMIN);

    expect(result).toBeDefined();
    expect(result).toEqual(mockUser);

    expect(mockPrismaService.enterprise.findUnique).toHaveBeenCalledTimes(1);
    expect(mockPrismaService.enterprise.findUnique).toHaveBeenCalledWith({
      where: { id: mockEnterprise.id },
    });
    
  });

  it('should return not found exception when finding an enterprise', async () => {
    expect(service.findOne).toBeDefined();

    const result = await service.findOne(9999, role.ADMIN);

    expect(result).toBeDefined();
    expect(result).toBeInstanceOf(NotFoundException);

    expect(mockPrismaService.enterprise.findUnique).toHaveBeenCalled();
  });

  it('should return unauthorized exception when finding an enterprise as a user', async () => {
    expect(service.findOne).toBeDefined();

    const result = await service.findOne(mockEnterprise.id, role.USER);

    expect(result).toBeDefined();
    expect(result).toBeInstanceOf(UnauthorizedException);
  });

  it('should find all enterprises', async () => {
    const result = await service.findAll();

    expect(result).toEqual(mockUsers);

    expect(mockPrismaService.enterprise.findMany).toHaveBeenCalledTimes(1);
    expect(mockPrismaService.enterprise.findMany).toHaveBeenCalledWith();
  });

  it('should update an enterprise', async () => {
    const result = await service.update(mockEnterprise.id, createEnterpriseDto, role.ADMIN);

    expect(result).toEqual(mockUpdatedEnterprise);
    
    expect(mockPrismaService.enterprise.update).toHaveBeenCalledTimes(1);
    expect(mockPrismaService.enterprise.update).toHaveBeenCalledWith({
      where: { id: mockEnterprise.id },
      data: { ...createEnterpriseDto },
    });
    
  });

  it('should return unauthorized exception when updating an enterprise as a user', async () => {
    expect(service.update).toBeDefined();

    const result = await service.update(1, createEnterpriseDto, role.USER);

    expect(result).toBeDefined();
    expect(result).toBeInstanceOf(UnauthorizedException);
  });

  it('should delete an enterprise', async () => {
    const result = await service.remove(mockEnterprise.id, role.ADMIN);

    expect(result).toEqual(mockUser);
    expect(mockPrismaService.enterprise.delete).toHaveBeenCalledTimes(1);
    expect(mockPrismaService.enterprise.delete).toHaveBeenCalledWith({
      where: { id: mockEnterprise.id },
    });
  });

  it('should return unauthorized exception when deleting an enterprise as a user', async () => {
    expect(service.remove).toBeDefined();

    const result = await service.remove(1, role.USER);

    expect(result).toBeDefined();
    expect(result).toBeInstanceOf(UnauthorizedException);
  });
});
