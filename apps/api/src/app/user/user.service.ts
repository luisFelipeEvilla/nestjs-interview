import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcrypt';
import { role } from '@prisma/client';

const roundsOfHash = 10;
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  
  async create(createUserDto: CreateUserDto, user_role: role) {
    if (user_role !== role.ADMIN) return new UnauthorizedException('You are not authorized to perform this action');

    const enterprise = await this.prisma.enterprise.findUnique({
      where: { id: createUserDto.enterprise_id },
    });

    if (!enterprise) return new NotFoundException(`Enterprise with id ${createUserDto.enterprise_id} not found`);

    //todo: encrypt passsword

    const hashedPassword = await bcrypt.hash(createUserDto.password, roundsOfHash);

    const user = await this.prisma.user.create({
      data: {
        email: createUserDto.email,
        name: createUserDto.name,
        password: hashedPassword,
        role: createUserDto.role,
        enterprise: {
          connect: {
            id: createUserDto.enterprise_id,
          },
        },
      },
    });

    return user;
  }

  async findAll(user_role: role) {
    if (user_role !== role.ADMIN) return new UnauthorizedException('You are not authorized to perform this action');
    
    const users = await this.prisma.user.findMany({
      include: {
        enterprise: true
      }
    });

    return users;
  }

  async findOne(id: number) {

    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        enterprise: true
      }
    });

    if (!user) return new NotFoundException('User not found');

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto, user_role: role) {
    if (user_role !== role.ADMIN) return new UnauthorizedException('You are not authorized to perform this action');

    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, roundsOfHash);
    }

    const user = await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });

    return user;
  }

  async remove(id: number, user_role: role) {
    if (user_role !== role.ADMIN) return new UnauthorizedException('You are not authorized to perform this action');

    const user = await this.prisma.user.delete({
      where: { id },
    });

    return user;
  }
}
