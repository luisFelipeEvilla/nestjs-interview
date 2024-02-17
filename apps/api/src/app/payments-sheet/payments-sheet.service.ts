import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreatePaymentsSheetDto } from './dto/create-payments-sheet.dto';
import { UpdatePaymentsSheetDto } from './dto/update-payments-sheet.dto';
import { PrismaService } from '../prisma.service';
import { payment_type, role } from '@prisma/client';

@Injectable()
export class PaymentsSheetService {
  constructor(private prisma: PrismaService) {}
  async create(createPaymentsSheetDto: CreatePaymentsSheetDto) {
    const { enterprise_id } = createPaymentsSheetDto;

    const paymentSheet = await this.prisma.payments_sheet.create({
      data: {
        enterprise_id,
      },
      include: {
        enterprise: true,
      },
    });

    const employees = await this.prisma.employee.findMany({
      where: {
        enterprise_Id: enterprise_id,
      },
    });

    for (const employee of employees) {
      await this.prisma.employee_payment.create({
        data: {
          employee_id: employee.id,
          payment_type: employee.payment_type,
          payment_rate: employee.payment_rate,
          timesheet_id: paymentSheet.id,
          units: employee.payment_type === payment_type.SALARY ? 1 : 0,
        },
      });
    }

    return paymentSheet;
  }

  async findAll(user_role: role, enterpriseId: number) {
    console.log(enterpriseId);
    console.log(user_role);
    try {
      const paymentsSheet = await this.prisma.payments_sheet.findMany({
        where: {
          enterprise_id: user_role === role.USER ? +enterpriseId : undefined,
        },
        include: {
          enterprise: true,
        },
      });

      return paymentsSheet;
    } catch (error) {
      console.error(error);
      return new InternalServerErrorException(`Error: ${error}`)
    }
  }

  async findOne(id: number, user_role: role, enterpriseId: number) {
    const paymentSheet = await this.prisma.payments_sheet.findUnique({
      where: {
        id,
        enterprise_id: user_role === role.USER ? enterpriseId : undefined,
      },
      include: {
        employee_payment: {
          include: {
            employee: true,
          },
        },
      },
    });

    return paymentSheet;
  }

  async update(
    id: number,
    updatePaymentsSheetDto: UpdatePaymentsSheetDto,
    user_role: role,
    enterpriseId: number,
  ) {
    const payment_sheet = await this.prisma.payments_sheet.findUnique({
      where: {
        id,
        enterprise_id: user_role === role.USER ? enterpriseId : undefined,
      },
    });

    if (!payment_sheet) return null;

    if (user_role === role.USER && payment_sheet.state === 'PENDING' ) updatePaymentsSheetDto.state = 'SUBMIT';
    const paymentSheet = await this.prisma.payments_sheet.update({
      where: {
        id,
      },
      data: {
        check_date: updatePaymentsSheetDto.check_date,
        state: updatePaymentsSheetDto.state,
      },
    });

    for (const employeePayment of updatePaymentsSheetDto.employee_payment) {
      await this.prisma.employee_payment.update({
        where: {
          id: employeePayment.id,
        },
        data: {
          units: employeePayment.units,
        },
      });
    }

    return paymentSheet;
  }

  async remove(id: number, user_role: role, enterpriseId: number) {
    const paymentSheet = await this.prisma.payments_sheet.delete({
      where: {
        id,
        enterprise_id: user_role === role.USER ? enterpriseId : undefined,
      },
    });

    return paymentSheet;
  }
}
