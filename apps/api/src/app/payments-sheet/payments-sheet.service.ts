import { Injectable } from '@nestjs/common';
import { CreatePaymentsSheetDto } from './dto/create-payments-sheet.dto';
import { UpdatePaymentsSheetDto } from './dto/update-payments-sheet.dto';
import { PrismaService } from '../prisma.service';
import { payment_type } from '@prisma/client';

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

    const employees = await this.prisma.employee.findMany({
      where: {
        enterprise_Id:  enterprise_id,
      },
    });

    for (const employee of employees) {
      await this.prisma.employee_payment.create({
        data: {
          employee_id: employee.id,
          payment_type: employee.payment_type,
          payment_rate: employee.payment_rate,
          timesheet_id: paymentSheet.id,
          units: employee.payment_type === payment_type.SALARY ? 1 : 0 ,
        },
      });
    }

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
      include: {
        employee_payment: {
          include: {
            employee: true,
          },
        }
      }
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