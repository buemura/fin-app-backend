import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AccountsService } from '@core/services/accounts.service';
import { AuthService } from '@core/services/auth.service';
import { ExpensesService } from '@core/services/expenses.service';
import { InvestmentsTrxService } from '@core/services/investments-trx.service';
import { InvestmentsService } from '@core/services/investments.service';
import { UsersService } from '@core/services/users.service';
import { JwtStrategy } from '@core/strategies/jwt.strategy';
import { LocalStrategy } from '@core/strategies/lcoal.strategy';
import { DatabaseModule } from '../database/database.module';
import { AccountsController } from './controllers/accounts.controller';
import { AuthController } from './controllers/auth.controller';
import { ExpensesController } from './controllers/expenses.controller';
import { InvestmentsTrxController } from './controllers/investments-trx.controller';
import { InvestmentsController } from './controllers/investments.controller';
import { UsersController } from './controllers/users.controller';

@Module({
  imports: [DatabaseModule, PassportModule, JwtModule],
  controllers: [
    UsersController,
    AuthController,
    ExpensesController,
    AccountsController,
    InvestmentsController,
    InvestmentsTrxController,
  ],
  providers: [
    LocalStrategy,
    JwtStrategy,
    UsersService,
    AuthService,
    ExpensesService,
    AccountsService,
    InvestmentsService,
    InvestmentsTrxService,
  ],
})
export class HttpModule {}
