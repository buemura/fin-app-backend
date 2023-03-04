import { Router, type Request, type Response } from "express";
import { ensureAuthentication } from "../middlewares/auth-middleware";
import { accountController } from "../utils/container";

const router = Router();

async function getAccountById(
  request: Request,
  response: Response
): Promise<Response> {
  return accountController.getAccountById(request, response);
}

async function getAccountsByUserId(
  request: Request,
  response: Response
): Promise<Response> {
  return accountController.getAccountsByUserId(request, response);
}

async function createAccount(
  request: Request,
  response: Response
): Promise<Response> {
  return accountController.createAccount(request, response);
}

async function updateAccount(
  request: Request,
  response: Response
): Promise<Response> {
  return accountController.updateAccount(request, response);
}

async function deleteAccount(
  request: Request,
  response: Response
): Promise<Response> {
  return accountController.deleteAccount(request, response);
}

router.get("/:userId/accounts", ensureAuthentication, getAccountsByUserId);
router.get("/:userId/accounts/:id", ensureAuthentication, getAccountById);
router.post("/:userId/accounts", ensureAuthentication, createAccount);
router.put("/:userId/accounts/:id", ensureAuthentication, updateAccount);
router.delete("/:userId/accounts/:id", ensureAuthentication, deleteAccount);

export { router as accountRouter };
