import { Router, type Request, type Response } from "express";
import { AccountController } from "../controllers/account-controller";
import { ensureAuthentication } from "../middlewares/auth-middleware";
import { UserRepository, AccountRepository } from "../repositories";
import { AccountService } from "../services/account-service";
import { RedisService } from "../services/redis-service";

const router = Router();

const userRepository = new UserRepository();
const accountRepository = new AccountRepository();
const redisService = new RedisService();
const accountService = new AccountService(
  userRepository,
  accountRepository,
  redisService
);
const accountController = new AccountController(accountService);

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
