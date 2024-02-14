import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEnterpriseDto } from './dto/create-enterprise.dto';
import { UpdateEnterpriseDto } from './dto/update-enterprise.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class EnterpriseService {
  constructor(private prisma: PrismaService) {}

  async create(createEnterpriseDto: CreateEnterpriseDto) {
    const enterprise = await this.prisma.enterprise.create({
      data: {
        ...createEnterpriseDto
      }
    });

    return enterprise;
  }

  async findAll() {
    const enterprises = await this.prisma.enterprise.findMany();

    return enterprises;
  }

  async findOne(id: number) {
    const enterprise = await this.prisma.enterprise.findUnique({
      where: { id },
    });

    if (!enterprise) return NotFoundException;

    return enterprise;
  }

  async update(id: number, updateEnterpriseDto: UpdateEnterpriseDto) {
    const enterprise = await this.prisma.enterprise.update({
      where: { id },
      data: {
        ...updateEnterpriseDto
      },
    });

    return enterprise;
  }

  async remove(id: number) {
    const enterprise = await this.prisma.enterprise.delete({
      where: { id },
    });

    return enterprise;
  }
}
