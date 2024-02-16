import { Test, TestingModule } from '@nestjs/testing';
import { EnterpriseController } from './enterprise.controller';
import { EnterpriseService } from './enterprise.service';
import { mockUser } from '@ocmi/api/mock/users';
import { role } from '@prisma/client';
import { NotFoundException, ParseIntPipe, UnauthorizedException } from '@nestjs/common';
import { createEnterpriseDto, mockEnterprise, mockEnterprises, mockUpdatedEnterprise, updateEnpterpriseDto } from '@ocmi/api/mock/enterprise';
import { CreateEnterpriseDto } from './dto/create-enterprise.dto';

describe('EnterpriseController', () => {
  let controller: EnterpriseController;

  const adminRequest = { user: { ...mockUser, role: role.ADMIN } };
  const userRequest = { user: { ...mockUser, role: role.USER } };

  const mockEnterpriseService = {
    create: jest.fn(async (createEnterpriseDto: CreateEnterpriseDto, user_role: role) => {
      if (user_role === role.USER)
        return new UnauthorizedException(
          'you are not allowed to perform this action',
        );

      return mockEnterprise;
    }),
    findAll: jest.fn((user_role: role) => {
      if (user_role === role.USER)
        return new UnauthorizedException(
          'you are not allowed to perform this action',
        );

      return mockEnterprises;
    }),
    findOne: jest.fn(async (id: number, user_role: role) => {
      if (user_role === role.USER) return new UnauthorizedException('you are not allowed to perform this action');

      const user = mockEnterprises.find((user) => user.id === id);

      if (!user) return new NotFoundException(`Enterprise with id: ${id} not found`);
    
      return user;
    }),
    update: jest.fn(
      async (id: number, updatedEnterpriseDto, user_role: role) => {
        if (user_role === role.USER)
          return new UnauthorizedException(
            'you are not allowed to perform this action',
          );

        return mockUpdatedEnterprise;
      },
    ),
    remove: jest.fn(async (id: number, user_role: role) => {
      if (user_role === role.USER)
        return new UnauthorizedException(
          'you are not allowed to perform this action',
        );

      return mockEnterprise;
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EnterpriseController],
      providers: [
        {
          provide: EnterpriseService,
          useValue: mockEnterpriseService,
        },
      ],
    }).compile();

    controller = module.get<EnterpriseController>(EnterpriseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create an enterprise', async () => {
    expect(controller.create).toBeDefined();

    const result = await controller.create(adminRequest, createEnterpriseDto);

    expect(result).toBeDefined();
    expect(result).toEqual(mockEnterprise);

    expect(mockEnterpriseService.create).toHaveBeenCalled();
    expect(mockEnterpriseService.create).toHaveBeenCalledWith(
      createEnterpriseDto,
      mockUser.role,
    );
  });

  it('should return unauthorized exception when creating an enterprise as a user', async () => {
    expect(controller.create).toBeDefined();

    const result = await controller.create(userRequest, createEnterpriseDto);

    expect(result).toBeDefined();
    expect(result).toBeInstanceOf(UnauthorizedException);
  });

  it('should find all enterprises', async () => {
    expect(controller.findAll).toBeDefined();

    const result = await controller.findAll();

    expect(result).toBeDefined();
    expect(result).toEqual(mockEnterprises);

    expect(mockEnterpriseService.findAll).toHaveBeenCalled();
    expect(mockEnterpriseService.findAll).toHaveBeenCalledWith();
  });

  it('should find an enterprise', async () => {
    expect(controller.findOne).toBeDefined();

    const result = await controller.findOne(adminRequest, mockEnterprise.id as unknown as ParseIntPipe);

    expect(result).toBeDefined();
    expect(result).toEqual(mockEnterprise);

    expect(mockEnterpriseService.findOne).toHaveBeenCalled();
    expect(mockEnterpriseService.findOne).toHaveBeenCalledWith(mockEnterprise.id, mockUser.role);
  });

  it('should return not found exception when finding an enterprise', async () => {
    expect(controller.findOne).toBeDefined();

    const result = await controller.findOne(adminRequest, 9999 as unknown as ParseIntPipe);

    expect(result).toBeDefined();
    expect(result).toBeInstanceOf(NotFoundException);

    expect(mockEnterpriseService.findOne).toHaveBeenCalled();
  });

  it('should return unauthorized exception when finding an enterprise as a user', async () => {
    expect(controller.findOne).toBeDefined();

    const result = await controller.findOne(userRequest, mockEnterprise.id as unknown as ParseIntPipe);

    expect(result).toBeDefined();
    expect(result).toBeInstanceOf(UnauthorizedException);
  });

  it('should update an enterprise', async () => {
    expect(controller.update).toBeDefined();

    const result = await controller.update(adminRequest, mockEnterprise.id as unknown as ParseIntPipe, updateEnpterpriseDto);

    expect(result).toBeDefined();
    expect(result).toEqual(mockUpdatedEnterprise);

    expect(mockEnterpriseService.update).toHaveBeenCalled();
    expect(mockEnterpriseService.update).toHaveBeenCalledWith(mockEnterprise.id, updateEnpterpriseDto, mockUser.role);
  });

  it('should return unauthorized exception when updating an enterprise as a user', async () => {
    expect(controller.update).toBeDefined();

    const result = await controller.update(userRequest, mockEnterprise.id as unknown as ParseIntPipe, createEnterpriseDto);

    expect(result).toBeDefined();
    expect(result).toBeInstanceOf(UnauthorizedException);
  });

  it('should delete an enterprise', async () => {
    expect(controller.remove).toBeDefined();

    const result = await controller.remove(adminRequest, mockEnterprise.id as unknown as ParseIntPipe);

    expect(result).toBeDefined();
    expect(result).toEqual(mockEnterprise);

    expect(mockEnterpriseService.remove).toHaveBeenCalled();
    expect(mockEnterpriseService.remove).toHaveBeenCalledWith(mockEnterprise.id, mockUser.role);
  });

  it('should return unauthorized exception when deleting an enterprise as a user', async () => {
    expect(controller.remove).toBeDefined();

    const result = await controller.remove(userRequest, mockEnterprise.id as unknown as ParseIntPipe);

    expect(result).toBeDefined();
    expect(result).toBeInstanceOf(UnauthorizedException);
  });


});
