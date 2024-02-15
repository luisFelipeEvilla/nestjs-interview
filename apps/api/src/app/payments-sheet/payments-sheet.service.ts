import { Injectable } from '@nestjs/common';
import { CreatePaymentsSheetDto } from './dto/create-payments-sheet.dto';
import { UpdatePaymentsSheetDto } from './dto/update-payments-sheet.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PaymentsSheetService {
  constructor(private prisma: PrismaService) {}
  async create(createPaymentsSheetDto: CreatePaymentsSheetDto) {
    const { enterprise_id } = createPaymentsSheetDto;

    const paymentSheet = await this.prisma.payments_sheet.create({
      data: {
        enterprise_id,
      },
    });

    return paymentSheet;
  }

  async findAll() {
    const paymentsSheet = await this.prisma.payments_sheet.findMany();
    
    return paymentsSheet;
  }

  async findOne(id: number) {
    const paymentSheet = await this.prisma.payments_sheet.findUnique({
      where: {
        id,
      },
    });

    return paymentSheet;
  }

  update(id: number, updatePaymentsSheetDto: UpdatePaymentsSheetDto) {
    return `This action updates a #${id} paymentsSheet`;
  }

  async remove(id: number) {
    const paymentSheet = await this.prisma.payments_sheet.delete({
      where: {
        id,
      },
    });

    return paymentSheet;
  }
}
