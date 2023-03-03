import { Module } from '@nestjs/common';

import { AccountRepository } from '@application/repositories/account.repository';
import { ExpenseRepository } from '@application/repositories/expense.repository';
import { InvestmentTrxRepository } from '@application/repositories/investment-trx.repository';
import { InvestmentRepository } from '@application/repositories/investment.repository';
import { UserRepository } from '@application/repositories/user.repository';
import { PrismaService } from './prisma/prisma.service';
import { PrismaAccountRepository } from './prisma/repositories/account.repository';
import { PrismaExpenseRepository } from './prisma/repositories/expense.repository';
import { PrismaInvestmentTrxRepository } from './prisma/repositories/investment-trx.repository';
import { PrismaInvestmentRepository } from './prisma/repositories/investment.repository';
import { PrismaUserRepository } from './prisma/repositories/user.repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
    {
      provide: ExpenseRepository,
      useClass: PrismaExpenseRepository,
    },
    {
      provide: AccountRepository,
      useClass: PrismaAccountRepository,
    },
    {
      provide: InvestmentRepository,
      useClass: PrismaInvestmentRepository,
    },
    {
      provide: InvestmentTrxRepository,
      useClass: PrismaInvestmentTrxRepository,
    },
  ],
  exports: [
    UserRepository,
    ExpenseRepository,
    AccountRepository,
    InvestmentRepository,
    InvestmentTrxRepository,
  ],
})
export class DatabaseModule {}
