import {
  LoginUserUsecase,
  RegisterUserUsecase,
} from "../../../../application/usecases";
import { UserRepository } from "../../../database";
import { AuthController } from "../../controllers/auth-controller";

export function makeAuthController(): AuthController {
  const userRepository = new UserRepository();

  const registerUserUsecase = new RegisterUserUsecase(userRepository);
  const loginUserUsecase = new LoginUserUsecase(userRepository);

  const authController = new AuthController(
    registerUserUsecase,
    loginUserUsecase
  );
  return authController;
}
