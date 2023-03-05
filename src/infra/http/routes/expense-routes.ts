import { Request, Response, Router } from "express";

import { expenseController } from "@shared/containers";
import { ensureAuthentication } from "../middlewares/auth-middleware";

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
  return expenseController.create(request, response);
}

async function resetPaymentStatus(
  request: Request,
  response: Response
): Promise<Response> {
  return expenseController.resetPaymentStatus(request, response);
}

async function updateExpense(
  request: Request,
  response: Response
): Promise<Response> {
  return expenseController.update(request, response);
}

async function deleteExpense(
  request: Request,
  response: Response
): Promise<Response> {
  return expenseController.delete(request, response);
}

router.get("/:userId/expenses", ensureAuthentication, findByUserId);
router.post("/:userId/expenses", ensureAuthentication, createExpense);
router.patch("/:userId/expenses", resetPaymentStatus);
router.patch(
  "/:userId/expenses/:expenseId",
  ensureAuthentication,
  updateExpense
);
router.delete(
  "/:userId/expenses/:expenseId",
  ensureAuthentication,
  deleteExpense
);

export { router as expenseRouter };
