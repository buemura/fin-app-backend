import { Request, Response, Router } from "express";
import { makeAuthController } from "../factories/controllers/auth-controller-factory";

const router = Router();
const authController = makeAuthController();

async function login(request: Request, response: Response): Promise<Response> {
  return authController.login(request, response);
}

async function register(
  request: Request,
  response: Response
): Promise<Response> {
  return authController.register(request, response);
}

router.post("/auth/login", login);
router.post("/auth/register", register);

export { router as authRouter };
