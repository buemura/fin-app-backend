import { Router, type Request, type Response } from "express";
import { ensureAuthentication } from "../middlewares/auth-middleware";
import { expenseController } from "../utils/container";

const router = Router();

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

router.get("/:userId/expenses", ensureAuthentication, findByUserId);
router.post("/:userId/expenses", ensureAuthentication, createExpense);
router.put("/:userId/expenses", updateAllExpense);
router.put("/:userId/expenses/:expenseId", ensureAuthentication, updateExpense);
router.delete(
  "/:userId/expenses/:expenseId",
  ensureAuthentication,
  deleteExpense
);

export { router as expenseRouter };
