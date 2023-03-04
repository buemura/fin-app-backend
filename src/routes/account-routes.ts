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

router.get("/account/:id", ensureAuthentication, getAccountById);
router.get("/accounts/:userId", ensureAuthentication, getAccountsByUserId);
router.post("/account", ensureAuthentication, createAccount);
router.put("/account/:id", ensureAuthentication, updateAccount);
router.delete("/account/:id", ensureAuthentication, deleteAccount);

export { router as accountRouter };
