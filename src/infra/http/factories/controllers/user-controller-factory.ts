import { UserService } from "../../../../application/services/user-service";
import { UserRepository } from "../../../../infra/database";
import { UserController } from "../../controllers/user-controller";

export function makeUserController(): UserController {
  const userRepository = new UserRepository();
  const userService = new UserService(userRepository);
  const userController = new UserController(userService);
  return userController;
}
