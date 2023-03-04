import { AccountController } from "../controllers/account-controller";
import { ExpenseController } from "../controllers/expense-controller";
import { InvestmentController } from "../controllers/investment-controller";
import { UserController } from "../controllers/user-controller";
import {
  AccountRepository,
  ExpenseRepository,
  InvestmentRepository,
  InvestmentTrxRepository,
  UserRepository,
} from "../repositories";
import { AccountService } from "../services/account-service";
import { ExpenseService } from "../services/expense-service";
import { InvestmentService } from "../services/investment-service";
import { RedisService } from "../services/redis-service";
import { UserService } from "../services/user-service";

const userRepository = new UserRepository();
const accountRepository = new AccountRepository();
const expenseRepository = new ExpenseRepository();
const investmentRepository = new InvestmentRepository();
const investmentTrxRepository = new InvestmentTrxRepository();

const redisService = new RedisService();
const userService = new UserService(userRepository);
const accountService = new AccountService(
  userRepository,
  accountRepository,
  redisService
);
const expenseService = new ExpenseService(
  userRepository,
  expenseRepository,
  redisService
);
const investmentService = new InvestmentService(
  userRepository,
  investmentRepository,
  investmentTrxRepository,
  redisService
);

export const userController = new UserController(userService);
export const accountController = new AccountController(accountService);
export const expenseController = new ExpenseController(expenseService);
export const investmentController = new InvestmentController(investmentService);
