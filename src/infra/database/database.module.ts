import { Module } from '@nestjs/common';

import { AccountRepository } from '@core/repositories/account.repository';
import { ExpenseRepository } from '@core/repositories/expense.repository';
import { InvestmentTrxRepository } from '@core/repositories/investment-trx.repository';
import { InvestmentRepository } from '@core/repositories/investment.repository';
import { UserRepository } from '@core/repositories/user.repository';
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
