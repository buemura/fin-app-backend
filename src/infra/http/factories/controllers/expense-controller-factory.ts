import { ExpenseService } from "../../../../application/services/expense-service";
import { RedisRepository } from "../../../../infra/cache";
import { ExpenseRepository, UserRepository } from "../../../../infra/database";
import { ExpenseController } from "../../controllers/expense-controller";

export function makeExpenseController(): ExpenseController {
  const redisRepository = new RedisRepository();
  const userRepository = new UserRepository();
  const expenseRepository = new ExpenseRepository(redisRepository);
  const expenseService = new ExpenseService(userRepository, expenseRepository);
  const expenseController = new ExpenseController(expenseService);
  return expenseController;
}
