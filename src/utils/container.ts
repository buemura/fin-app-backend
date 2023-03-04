import { AccountController } from "@controllers/account-controller";
import { ExpenseController } from "@controllers/expense-controller";
import { InvestmentController } from "@controllers/investment-controller";
import { InvestmentTrxController } from "@controllers/investment-trx-controller";
import { UserController } from "@controllers/user-controller";
import { RedisRepository } from "@repositories/implementation/redis/redis-repository";
import {
  AccountRepository,
  ExpenseRepository,
  InvestmentRepository,
  InvestmentTrxRepository,
  UserRepository,
} from "@repositories/index";
import { AccountService } from "@services/account-service";
import { ExpenseService } from "@services/expense-service";
import { InvestmentService } from "@services/investment-service";
import { InvestmentTrxService } from "@services/investment-trx-service";
import { UserService } from "@services/user-service";

const redisRepository = new RedisRepository();
const userRepository = new UserRepository();
const accountRepository = new AccountRepository(redisRepository);
const expenseRepository = new ExpenseRepository(redisRepository);
const investmentRepository = new InvestmentRepository(redisRepository);
const investmentTrxRepository = new InvestmentTrxRepository(redisRepository);

const userService = new UserService(userRepository);
const accountService = new AccountService(userRepository, accountRepository);
const expenseService = new ExpenseService(userRepository, expenseRepository);
const investmentService = new InvestmentService(
  userRepository,
  investmentRepository
);
const investmentTrxService = new InvestmentTrxService(
  userRepository,
  investmentRepository,
  investmentTrxRepository
);

export const userController = new UserController(userService);
export const accountController = new AccountController(accountService);
export const expenseController = new ExpenseController(expenseService);
export const investmentController = new InvestmentController(investmentService);
export const investmentTrxController = new InvestmentTrxController(
  investmentTrxService
);
