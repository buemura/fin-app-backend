import { Router, Request, Response } from "express";
import { ensureAuthentication } from "../middlewares/auth-middleware";
import { InvestmentService } from "../services/investment-service";
import { InvestmentController } from "../controllers/investment-controller";
import { InvestmentRepository, UserRepository } from "../repositories";
import { RedisService } from "../services/redis-service";

const router = Router();

const redisService = new RedisService();
const userRepository = new UserRepository();
const investmentRepository = new InvestmentRepository();
const investmentService = new InvestmentService(
  userRepository,
  investmentRepository,
  redisService
);
const investmentController = new InvestmentController(investmentService);

async function findByUserId(
  request: Request,
  response: Response
): Promise<Response> {
  return investmentController.findByUserId(request, response);
}

async function createInvestment(
  request: Request,
  response: Response
): Promise<Response> {
  return investmentController.createInvestment(request, response);
}

async function updateInvestment(
  request: Request,
  response: Response
): Promise<Response> {
  return investmentController.updateInvestment(request, response);
}

async function deleteInvestment(
  request: Request,
  response: Response
): Promise<Response> {
  return investmentController.deleteInvestment(request, response);
}

router.get("/investments", ensureAuthentication, findByUserId);
router.post("/investments", ensureAuthentication, createInvestment);
router.put(
  "/investments/:investmentId",
  ensureAuthentication,
  updateInvestment
);
router.delete(
  "/investments/:investmentId",
  ensureAuthentication,
  deleteInvestment
);

export { router as investmentRouter };
