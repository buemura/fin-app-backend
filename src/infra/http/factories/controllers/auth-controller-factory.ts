import { AuthService } from "../../../../application/services/auth-service";
import { UserRepository } from "../../../../infra/database";
import { AccessTokenProviderImpl } from "../../../../providers/implementation/access-token-provider";
import { PasswordHashProviderImpl } from "../../../../providers/implementation/password-hash-provider";
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
