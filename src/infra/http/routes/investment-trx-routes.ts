import { Request, Response, Router } from "express";

import { investmentTrxController } from "../../../shared/containers";
import { ensureAuthentication } from "../middlewares/auth-middleware";

const router = Router();

async function findTrxByUserId(
  request: Request,
  response: Response
): Promise<Response> {
  return investmentTrxController.findByUserId(request, response);
}

async function createInvestmentTrx(
  request: Request,
  response: Response
): Promise<Response> {
  return investmentTrxController.create(request, response);
}

async function updateInvestmentTrx(
  request: Request,
  response: Response
): Promise<Response> {
  return investmentTrxController.update(request, response);
}

async function deleteInvestmentTrx(
  request: Request,
  response: Response
): Promise<Response> {
  return investmentTrxController.delete(request, response);
}

router.get("/:userId/investments-trx", ensureAuthentication, findTrxByUserId);
router.post(
  "/:userId/investments-trx",
  ensureAuthentication,
  createInvestmentTrx
);
router.patch(
  "/:userId/investments-trx/:investmentTrxId",
  ensureAuthentication,
  updateInvestmentTrx
);
router.delete(
  "/:userId/investments-trx/:investmentTrxId",
  ensureAuthentication,
  deleteInvestmentTrx
);

export { router as investmentTrxRouter };
