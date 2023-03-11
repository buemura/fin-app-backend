import {
  CreateExpenseUsecase,
  DeleteExpenseUsecase,
  GetUserExpensesUsecase,
  ResetExpensesPaymentStatusUsecase,
  UpdateExpenseUsecase,
} from "../../../../application/usecases";
import { RedisRepository } from "../../../cache";
import { ExpenseRepository, UserRepository } from "../../../database";
import { ExpenseController } from "../../controllers/expense-controller";

export function makeExpenseController(): ExpenseController {
  const redisRepository = new RedisRepository();
  const userRepository = new UserRepository();
  const expenseRepository = new ExpenseRepository(redisRepository);

  const getUserExpensesUsecase = new GetUserExpensesUsecase(
    userRepository,
    expenseRepository
  );
  const createExpenseUsecase = new CreateExpenseUsecase(
    userRepository,
    expenseRepository
  );
  const updateExpenseUsecase = new UpdateExpenseUsecase(expenseRepository);
  const resetExpensesPaymentStatusUsecase =
    new ResetExpensesPaymentStatusUsecase(expenseRepository);
  const deleteExpenseUsecase = new DeleteExpenseUsecase(expenseRepository);

  const expenseController = new ExpenseController(
    getUserExpensesUsecase,
    createExpenseUsecase,
    updateExpenseUsecase,
    resetExpensesPaymentStatusUsecase,
    deleteExpenseUsecase
  );
  return expenseController;
}
