import { Router, Request, Response } from "express";
import { ExpenseController } from "@controllers/expense-controller";
import { ensureAuthentication } from "@middlewares/auth-middleware";
import { ExpenseRepository, UserRepository } from "@repositories";
import { ExpenseService } from "@services/expense-service";

const router = Router();

const userRepository = new UserRepository();
const expenseRepository = new ExpenseRepository();
const expenseService = new ExpenseService(userRepository, expenseRepository);
const expenseController = new ExpenseController(expenseService);

function findByUserId(request: Request, response: Response) {
  return expenseController.findByUserId(request, response);
}

function createExpense(request: Request, response: Response) {
  return expenseController.createExpense(request, response);
}

function updateAllExpense(request: Request, response: Response) {
  return expenseController.updateAllExpense(request, response);
}

function updateExpense(request: Request, response: Response) {
  return expenseController.updateExpense(request, response);
}

function deleteExpense(request: Request, response: Response) {
  return expenseController.deleteExpense(request, response);
}

router.get("/expense/:userId", ensureAuthentication, findByUserId);
router.post("/expense", ensureAuthentication, createExpense);
router.put("/expense", updateAllExpense);
router.put("/expense/:expenseId", ensureAuthentication, updateExpense);
router.delete("/expense/:expenseId", ensureAuthentication, deleteExpense);

export { router as expenseRouter };
