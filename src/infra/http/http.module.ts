import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { UsersController } from './controllers/users.controller';
import { AuthController } from './controllers/auth.controller';
import { ExpensesController } from './controllers/expenses.controller';
import { AccountsController } from './controllers/accounts.controller';
import { UsersService } from '@application/services/users.service';
import { AuthService } from '@application/services/auth.service';
import { ExpensesService } from '@application/services/expenses.service';
import { AccountsService } from '@application/services/accounts.service';

@Module({
  imports: [DatabaseModule],
  controllers: [
    UsersController,
    AuthController,
    ExpensesController,
    AccountsController,
  ],
  providers: [UsersService, AuthService, ExpensesService, AccountsService],
})
export class HttpModule {}
