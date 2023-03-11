import { Request, Response, Router } from "express";
import { makeUserController } from "../factories/controllers/user-controller-factory";
import { ensureAuthentication } from "../middlewares/auth-middleware";

const router = Router();
const userController = makeUserController();

async function findById(
  request: Request,
  response: Response
): Promise<Response> {
  return userController.findById(request, response);
}

router.get("/:userId", ensureAuthentication, findById);

export { router as userRouter };
