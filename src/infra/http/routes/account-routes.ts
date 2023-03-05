import { Request, Response, Router } from "express";

import { accountController } from "../../../shared/containers";
import { ensureAuthentication } from "../middlewares/auth-middleware";

const router = Router();

async function getAccountById(
  request: Request,
  response: Response
): Promise<Response> {
  return accountController.findById(request, response);
}

async function getAccountsByUserId(
  request: Request,
  response: Response
): Promise<Response> {
  return accountController.findByUserId(request, response);
}

async function createAccount(
  request: Request,
  response: Response
): Promise<Response> {
  return accountController.create(request, response);
}

async function updateAccount(
  request: Request,
  response: Response
): Promise<Response> {
  return accountController.update(request, response);
}

async function deleteAccount(
  request: Request,
  response: Response
): Promise<Response> {
  return accountController.delete(request, response);
}

router.get("/:userId/accounts", ensureAuthentication, getAccountsByUserId);
router.get("/:userId/accounts/:id", ensureAuthentication, getAccountById);
router.post("/:userId/accounts", ensureAuthentication, createAccount);
router.patch("/:userId/accounts/:id", ensureAuthentication, updateAccount);
router.delete("/:userId/accounts/:id", ensureAuthentication, deleteAccount);

export { router as accountRouter };
