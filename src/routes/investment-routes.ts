import { Request, Response, Router } from "express";

import { ensureAuthentication } from "@middlewares/auth-middleware";
import { investmentController } from "@utils/container";

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

export { router as investmentRouter };
