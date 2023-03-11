import { GetUserDetailsUsecase } from "../../../../application/usecases";
import { UserRepository } from "../../../database";
import { UserController } from "../../controllers/user-controller";

export function makeUserController(): UserController {
  const userRepository = new UserRepository();
  const getUserDetailsUsecase = new GetUserDetailsUsecase(userRepository);
  const userController = new UserController(getUserDetailsUsecase);
  return userController;
}
