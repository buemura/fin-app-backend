import { Request, Response, Router } from "express";
import { ensureAuthentication } from "../middlewares/auth-middleware";
import { investmentController } from "../utils/container";

const router = Router();

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

router.get("/:userId/investments", ensureAuthentication, findByUserId);
router.post("/:userId/investments", ensureAuthentication, createInvestment);
router.put(
  "/:userId/investments/:investmentId",
  ensureAuthentication,
  updateInvestment
);
router.delete(
  "/:userId/investments/:investmentId",
  ensureAuthentication,
  deleteInvestment
);

async function findTrxByUserId(
  request: Request,
  response: Response
): Promise<Response> {
  return investmentController.findTrxByUserId(request, response);
}

async function createInvestmentTrx(
  request: Request,
  response: Response
): Promise<Response> {
  return investmentController.createInvestmentTrx(request, response);
}

async function updateInvestmentTrx(
  request: Request,
  response: Response
): Promise<Response> {
  return investmentController.updateInvestmentTrx(request, response);
}

async function deleteInvestmentTrx(
  request: Request,
  response: Response
): Promise<Response> {
  return investmentController.deleteInvestmentTrx(request, response);
}
router.get(
  "/:userId/investment-transaction",
  ensureAuthentication,
  findTrxByUserId
);
router.post(
  "/:userId/investment-transaction",
  ensureAuthentication,
  createInvestmentTrx
);
router.put(
  "/:userId/investment-transaction/:investmentTrxId",
  ensureAuthentication,
  updateInvestmentTrx
);
router.delete(
  "/:userId/investment-transaction/:investmentTrxId",
  ensureAuthentication,
  deleteInvestmentTrx
);

export { router as investmentRouter };
