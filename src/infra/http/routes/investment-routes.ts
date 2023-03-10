import { Request, Response, Router } from "express";

import { makeInvestmentController } from "../factories/controllers/investment-controller-factory";
import { ensureAuthentication } from "../middlewares/auth-middleware";

const router = Router();
const investmentController = makeInvestmentController();

async function findByUserId(
  request: Request,
  response: Response
): Promise<Response> {
  return investmentController.findByUserId(request, response);
}

async function updateInvestmentsCurrentPrices(
  request: Request,
  response: Response
): Promise<Response> {
  return investmentController.updateInvestmentsCurrentPrices(request, response);
}

async function createInvestment(
  request: Request,
  response: Response
): Promise<Response> {
  return investmentController.create(request, response);
}

async function updateInvestment(
  request: Request,
  response: Response
): Promise<Response> {
  return investmentController.update(request, response);
}

async function deleteInvestment(
  request: Request,
  response: Response
): Promise<Response> {
  return investmentController.delete(request, response);
}

router.get("/:userId/investments", ensureAuthentication, findByUserId);
router.get(
  "/:userId/investments-update",
  ensureAuthentication,
  updateInvestmentsCurrentPrices
);
// router.get("/:userId/investments/:investmentId", ensureAuthentication, findById);
router.post("/:userId/investments", ensureAuthentication, createInvestment);
router.patch(
  "/:userId/investments/:investmentId",
  ensureAuthentication,
  updateInvestment
);
router.delete(
  "/:userId/investments/:investmentId",
  ensureAuthentication,
  deleteInvestment
);

export { router as investmentRouter };
