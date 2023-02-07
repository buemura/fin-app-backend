import { Router, Request, Response } from "express";
import { UserRepository } from "@repositories";
import { UserService } from "@services/user-service";
import { UserController } from "@controllers/user-controller";
import { ensureAuthentication } from "@middlewares/auth-middleware";

const router = Router();

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

function getUserDetails(request: Request, response: Response) {
  return userController.getUserDetails(request, response);
}

function signIn(request: Request, response: Response) {
  return userController.signIn(request, response);
}

function signUp(request: Request, response: Response) {
  return userController.signIn(request, response);
}

router.get("/user/:userId", ensureAuthentication, getUserDetails);
router.post("/auth/signin", signIn);
router.post("/auth/signup", signUp);

export { router as userRouter };
