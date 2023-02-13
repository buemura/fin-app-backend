import { Router, type Request, type Response } from "express";
import { ExpenseController } from "../controllers/expense-controller";
import { ensureAuthentication } from "../middlewares/auth-middleware";
import { ExpenseRepository, UserRepository } from "../repositories";
import { ExpenseService } from "../services/expense-service";
import { RedisService } from "../services/redis-service";

const router = Router();

const userRepository = new UserRepository();
const expenseRepository = new ExpenseRepository();
const redisService = new RedisService();
const expenseService = new ExpenseService(
  userRepository,
  expenseRepository,
  redisService
);
const expenseController = new ExpenseController(expenseService);

async function findByUserId(
  request: Request,
  response: Response
): Promise<Response> {
  return expenseController.findByUserId(request, response);
}

async function createExpense(
  request: Request,
  response: Response
): Promise<Response> {
  return expenseController.createExpense(request, response);
}

async function updateAllExpense(
  request: Request,
  response: Response
): Promise<Response> {
  return expenseController.updateAllExpense(request, response);
}

async function updateExpense(
  request: Request,
  response: Response
): Promise<Response> {
  return expenseController.updateExpense(request, response);
}

async function deleteExpense(
  request: Request,
  response: Response
): Promise<Response> {
  return expenseController.deleteExpense(request, response);
}

router.get("/expense/:userId", ensureAuthentication, findByUserId);
router.post("/expense", ensureAuthentication, createExpense);
router.put("/expense", updateAllExpense);
router.put("/expense/:expenseId", ensureAuthentication, updateExpense);
router.delete("/expense/:expenseId", ensureAuthentication, deleteExpense);

export { router as expenseRouter };
