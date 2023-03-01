import { Module } from '@nestjs/common';
import { UserRepository } from '@application/repositories/user.repository';
import { ExpenseRepository } from '@application/repositories/expense.repository';
import { PrismaService } from './prisma/prisma.service';
import { PrismaUserRepository } from './prisma/repositories/user.repository';
import { PrismaExpenseRepository } from './prisma/repositories/expense.repository';

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
  ],
  exports: [UserRepository, ExpenseRepository],
})
export class DatabaseModule {}
