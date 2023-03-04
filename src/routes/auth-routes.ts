import { Request, Response, Router } from "express";

import { userController } from "@utils/container";

const router = Router();

async function signIn(request: Request, response: Response): Promise<Response> {
  return userController.signIn(request, response);
}

async function signUp(request: Request, response: Response): Promise<Response> {
  return userController.signUp(request, response);
}

router.post("/auth/login", signIn);
router.post("/auth/register", signUp);

export { router as authRouter };
