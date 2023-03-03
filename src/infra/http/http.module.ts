import { Module } from '@nestjs/common';

import { AccountsService } from '@application/services/accounts.service';
import { AuthService } from '@application/services/auth.service';
import { ExpensesService } from '@application/services/expenses.service';
import { InvestmentsTrxService } from '@application/services/investments-trx.service';
import { InvestmentsService } from '@application/services/investments.service';
import { UsersService } from '@application/services/users.service';
import { DatabaseModule } from '../database/database.module';
import { AccountsController } from './controllers/accounts.controller';
import { AuthController } from './controllers/auth.controller';
import { ExpensesController } from './controllers/expenses.controller';
import { InvestmentsTrxController } from './controllers/investments-trx.controller';
import { InvestmentsController } from './controllers/investments.controller';
import { UsersController } from './controllers/users.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [
    UsersController,
    AuthController,
    ExpensesController,
    AccountsController,
    InvestmentsController,
    InvestmentsTrxController,
  ],
  providers: [
    UsersService,
    AuthService,
    ExpensesService,
    AccountsService,
    InvestmentsService,
    InvestmentsTrxService,
  ],
})
export class HttpModule {}
