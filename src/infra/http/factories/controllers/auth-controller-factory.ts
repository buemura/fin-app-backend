import { AuthService } from "../../../../application/services/auth-service";
import { UserRepository } from "../../../database";
import { AccessTokenProviderImpl } from "../../../providers/access-token-provider";
import { PasswordHashProviderImpl } from "../../../providers/password-hash-provider";
import { AuthController } from "../../controllers/auth-controller";

export function makeAuthController(): AuthController {
  const userRepository = new UserRepository();

  const passwordHashProvider = new PasswordHashProviderImpl();
  const accessTokenProvider = new AccessTokenProviderImpl();

  const authService = new AuthService(
    userRepository,
    passwordHashProvider,
    accessTokenProvider
  );
  const authController = new AuthController(authService);
  return authController;
}
