import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcrypt';

const roundsOfHash = 10;
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  
  async create(createUserDto: CreateUserDto) {
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

  async findAll() {
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
    });

    if (!user) return new NotFoundException('User not found');

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, roundsOfHash);
    }

    const user = await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });

    return user;
  }

  async remove(id: number) {
    const user = await this.prisma.user.delete({
      where: { id },
    });

    return user;
  }
}
