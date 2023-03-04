import { Router, type Request, type Response } from "express";
import { ensureAuthentication } from "../middlewares/auth-middleware";
import { userController } from "../utils/container";

const router = Router();

async function getUserDetails(
  request: Request,
  response: Response
): Promise<Response> {
  return userController.getUserDetails(request, response);
}

async function signIn(request: Request, response: Response): Promise<Response> {
  return userController.signIn(request, response);
}

async function signUp(request: Request, response: Response): Promise<Response> {
  return userController.signUp(request, response);
}

router.get("/user/:userId", ensureAuthentication, getUserDetails);
router.post("/auth/signin", signIn);
router.post("/auth/signup", signUp);

export { router as userRouter };
