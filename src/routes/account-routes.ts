import { Router, Request, Response } from "express";
import { AccountController } from "@controllers/account-controller";
import { ensureAuthentication } from "@middlewares/auth-middleware";
import { UserRepository, AccountRepository } from "@repositories";
import { AccountService } from "@services/account-service";

const router = Router();

const userRepository = new UserRepository();
const accountRepository = new AccountRepository();
const accountService = new AccountService(userRepository, accountRepository);
const accountController = new AccountController(accountService);

function getAccountById(request: Request, response: Response) {
  return accountController.getAccountById(request, response);
}

function getAccountsByUserId(request: Request, response: Response) {
  return accountController.getAccountsByUserId(request, response);
}

function createAccount(request: Request, response: Response) {
  return accountController.createAccount(request, response);
}

function updateAccount(request: Request, response: Response) {
  return accountController.updateAccount(request, response);
}

function deleteAccount(request: Request, response: Response) {
  return accountController.deleteAccount(request, response);
}

router.get("/account/:id", ensureAuthentication, getAccountById);
router.get("/accounts/:userId", ensureAuthentication, getAccountsByUserId);
router.post("/account", ensureAuthentication, createAccount);
router.put("/account/:id", ensureAuthentication, updateAccount);
router.delete("/account/:id", ensureAuthentication, deleteAccount);

export { router as accountRouter };
