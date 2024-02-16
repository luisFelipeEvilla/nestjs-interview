import { Module } from '@nestjs/common';
import { PaymentsSheetService } from './payments-sheet.service';
import { PaymentsSheetController } from './payments-sheet.controller';
import { PrismaService } from '../prisma.service';
import { AuthService } from '../auth/auth.service';

@Module({
  controllers: [PaymentsSheetController],
  providers: [PaymentsSheetService, PrismaService],
})
export class PaymentsSheetModule {}
