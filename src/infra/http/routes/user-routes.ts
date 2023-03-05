import { Request, Response, Router } from "express";

import { userController } from "../../../shared/containers";
import { ensureAuthentication } from "../middlewares/auth-middleware";

const router = Router();

async function findById(
  request: Request,
  response: Response
): Promise<Response> {
  return userController.findById(request, response);
}

router.get("/:userId", ensureAuthentication, findById);

export { router as userRouter };
