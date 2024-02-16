import { mockUpdatedUser, updateUserDto, mockUser } from './../../mock/users';
import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { mockUsers, userDto } from '@ocmi/api/mock/users';
import { CreateUserDto } from './dto/create-user.dto';
import { role } from '@prisma/client';
import {
  NotFoundException,
  ParseIntPipe,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

describe('UserController', () => {
  let controller: UserController;

  const adminRequest = { user: { ...mockUser, role: role.ADMIN } };
  const userRequest = { user: { ...mockUser, role: role.USER } };

  const mockUserService = {
    create: jest.fn(async (createUserDto: CreateUserDto, user_role: role) => {
      if (user_role === role.USER)
        return new UnauthorizedException(
          'you are not allowed to perform this action',
        );

      return mockUser;
    }),
    findAll: jest.fn((user_role: role) => {
      if (user_role === role.USER)
        return new UnauthorizedException(
          'you are not allowed to perform this action',
        );

      return mockUsers;
    }),
    findOne: jest.fn(async (id: number) => {
      const user = mockUsers.find((user) => user.id === id);

      if (!user) return new NotFoundException(`User with id: ${id} not found`);

      return user;
    }),
    update: jest.fn(
      async (id: number, updatedUserDto: UpdateUserDto, user_role: role) => {
        if (user_role === role.USER)
          return new UnauthorizedException(
            'you are not allowed to perform this action',
          );

        const user = mockUsers.find((user) => user.id === id);

        if (!user)
          return new NotFoundException(`User with id: ${id} Not found`);

        return mockUpdatedUser;
      },
    ),
    remove: jest.fn(async (id: number, user_role: role) => {
      if (user_role === role.USER)
        return new UnauthorizedException(
          'you are not allowed to perform this action',
        );

      const user = mockUsers.find((user) => user.id === id);

      if (!user) return new NotFoundException(`User with id: ${id} not found`);

      return mockUser;
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', async () => {
    expect(controller.create).toBeDefined();

    const result = await controller.create(adminRequest, userDto);

    expect(result).toEqual(mockUser);

    expect(mockUserService.create).toHaveBeenCalled();
    expect(mockUserService.create).toHaveBeenCalledWith(userDto, mockUser.role);
  });

  it('should return unauthorized', async () => {
    expect(controller.create).toBeDefined();

    const result = await controller.create(userRequest, userDto);

    expect(result).toBeInstanceOf(UnauthorizedException);

    expect(mockUserService.create).toHaveBeenCalled();
    expect(mockUserService.create).toHaveBeenCalledWith(userDto, mockUser.role);
  });

  it('should fetch all users', async () => {
    expect(controller.findAll).toBeDefined();

    const result = await controller.findAll(adminRequest);

    expect(result).toBeDefined();
    expect(result).toEqual(mockUsers);

    expect(mockUserService.findAll).toHaveBeenCalled();
    expect(mockUserService.findAll).toHaveBeenCalledWith(role.ADMIN);
  });

  it('should return unauthorized', async () => {
    expect(controller.findAll).toBeDefined();

    const result = await controller.findAll({
      user: { ...mockUser, role: role.USER },
    });

    expect(result).toBeInstanceOf(UnauthorizedException);
  });

  it('should return an user with the specified id', async () => {
    expect(controller.findOne).toBeDefined();

    const result = await controller.findOne(
      adminRequest,
      mockUser.id as unknown as ParseIntPipe,
    );

    expect(result).toBeDefined();
    expect(result).toEqual(mockUser);

    expect(mockUserService.findOne).toHaveBeenCalled();
    expect(mockUserService.findOne).toHaveBeenCalledWith(mockUser.id);
  });

  it('should return not found', async () => {
    expect(controller.findOne).toBeDefined();

    const result = await controller.findOne(
      adminRequest,
      999 as unknown as ParseIntPipe,
    );

    expect(result).toBeDefined();
    expect(result).toBeInstanceOf(NotFoundException);
  });

  it('should update a user', async () => {
    expect(controller.update).toBeDefined();

    const result = await controller.update(
      adminRequest,
      mockUser.id as unknown as ParseIntPipe,
      updateUserDto,
    );

    expect(result).toBeDefined();
    expect(result).toEqual(mockUpdatedUser);

    expect(mockUserService.update).toHaveBeenCalled();
    expect(mockUserService.update).toHaveBeenCalledWith(
      mockUser.id,
      updateUserDto,
      role.ADMIN,
    );
  });

  it('should return unauthorized', async () => {
    expect(controller.update).toBeDefined();

    const result = await controller.update(
      userRequest,
      mockUser.id as unknown as ParseIntPipe,
      updateUserDto,
    );

    expect(result).toBeDefined();
    expect(result).toBeInstanceOf(UnauthorizedException);
  });

  it('should delete an user', async () => {
    expect(controller.remove).toBeDefined();

    const result = await controller.remove(
      adminRequest,
      mockUser.id as unknown as ParseIntPipe,
    )

    expect(result).toBeDefined();
    expect(result).toEqual(mockUser);

    expect(mockUserService.remove).toHaveBeenCalled();
    expect(mockUserService.remove).toHaveBeenCalledWith(mockUser.id, role.ADMIN)
  })

  it('should return not found', async() => {
    expect(controller.remove).toBeDefined();

    const result = await controller.remove(
      adminRequest,
      999 as unknown as ParseIntPipe,
    )

    expect(result).toBeInstanceOf(NotFoundException)

    expect(mockUserService.remove).toHaveBeenCalled();
    expect(mockUserService.remove).toHaveBeenCalledWith(mockUser.id, role.ADMIN)
  })


  it('should return unauthorized', async() => {
    expect(controller.remove).toBeDefined();

    const result = await controller.remove(
      userRequest,
      mockUser.id as unknown as ParseIntPipe,
    )

    expect(result).toBeInstanceOf(UnauthorizedException)

    expect(mockUserService.remove).toHaveBeenCalled();
    expect(mockUserService.remove).toHaveBeenCalledWith(mockUser.id, role.ADMIN)
  })
});
