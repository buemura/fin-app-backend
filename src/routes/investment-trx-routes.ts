import { Request, Response, Router } from "express";

import { ensureAuthentication } from "@middlewares/auth-middleware";
import { investmentTrxController } from "@utils/container";

const router = Router();

async function findTrxByUserId(
  request: Request,
  response: Response
): Promise<Response> {
  return investmentTrxController.findTrxByUserId(request, response);
}

async function createInvestmentTrx(
  request: Request,
  response: Response
): Promise<Response> {
  return investmentTrxController.createInvestmentTrx(request, response);
}

async function updateInvestmentTrx(
  request: Request,
  response: Response
): Promise<Response> {
  return investmentTrxController.updateInvestmentTrx(request, response);
}

async function deleteInvestmentTrx(
  request: Request,
  response: Response
): Promise<Response> {
  return investmentTrxController.deleteInvestmentTrx(request, response);
}

router.get("/:userId/investments-trx", ensureAuthentication, findTrxByUserId);
router.post(
  "/:userId/investments-trx",
  ensureAuthentication,
  createInvestmentTrx
);
router.put(
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
