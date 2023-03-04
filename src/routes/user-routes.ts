import { Request, Response, Router } from "express";

import { ensureAuthentication } from "@middlewares/auth-middleware";
import { userController } from "@utils/container";

const router = Router();

async function getUserDetails(
  request: Request,
  response: Response
): Promise<Response> {
  return userController.getUserDetails(request, response);
}

router.get("/users/:userId", ensureAuthentication, getUserDetails);

export { router as userRouter };
