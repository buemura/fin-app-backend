import { AccountService } from "@application/services/account-service";
import { AuthService } from "@application/services/auth-service";
import { ExpenseService } from "@application/services/expense-service";
import { InvestmentService } from "@application/services/investment-service";
import { InvestmentTrxService } from "@application/services/investment-trx-service";
import { UserService } from "@application/services/user-service";
import { RedisRepository } from "@infra/cache";
import {
  AccountRepository,
  ExpenseRepository,
  InvestmentRepository,
  InvestmentTrxRepository,
  UserRepository,
} from "@infra/database";
import { AccountController } from "@infra/http/controllers/account-controller";
import { AuthController } from "@infra/http/controllers/auth-controller";
import { ExpenseController } from "@infra/http/controllers/expense-controller";
import { InvestmentController } from "@infra/http/controllers/investment-controller";
import { InvestmentTrxController } from "@infra/http/controllers/investment-trx-controller";
import { UserController } from "@infra/http/controllers/user-controller";

const redisRepository = new RedisRepository();
const userRepository = new UserRepository();
const accountRepository = new AccountRepository(redisRepository);
const expenseRepository = new ExpenseRepository(redisRepository);
const investmentRepository = new InvestmentRepository(redisRepository);
const investmentTrxRepository = new InvestmentTrxRepository(redisRepository);

const authService = new AuthService(userRepository);
const userService = new UserService(userRepository);
const accountService = new AccountService(userRepository, accountRepository);
const expenseService = new ExpenseService(userRepository, expenseRepository);
const investmentService = new InvestmentService(
  userRepository,
  accountRepository,
  investmentRepository
);
const investmentTrxService = new InvestmentTrxService(
  userRepository,
  investmentRepository,
  investmentTrxRepository
);

export const authController = new AuthController(authService);
export const userController = new UserController(userService);
export const accountController = new AccountController(accountService);
export const expenseController = new ExpenseController(expenseService);
export const investmentController = new InvestmentController(investmentService);
export const investmentTrxController = new InvestmentTrxController(
  investmentTrxService
);
