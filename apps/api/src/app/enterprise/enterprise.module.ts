import { Module } from '@nestjs/common';
import { EnterpriseService } from './enterprise.service';
import { EnterpriseController } from './enterprise.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [EnterpriseController],
  providers: [EnterpriseService, PrismaService],
})
export class EnterpriseModule {}
