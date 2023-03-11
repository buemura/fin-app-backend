import { AppError } from "../../../helpers/errors/app-error";
import { ERROR_MESSAGE } from "../../../helpers/errors/messages";
import { logger } from "../../../helpers/logger";
import { AccessTokenProvider } from "../../../providers/access-token-provider";
import { PasswordHashProvider } from "../../../providers/password-hash-provider";
import { LoginAuthDto } from "../../dtos/auth-dto";
import { ResponseDto } from "../../dtos/response-dto";
import { UserRepository } from "../../repositories/user-repository";

export class LoginUserUsecase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({ email, password }: LoginAuthDto): Promise<ResponseDto> {
    if (!email || !password) {
      logger.info(`[LoginUserUsecase]: Missing required parameters`);
      throw new AppError(ERROR_MESSAGE.MISSING_REQUIRED_PARAMETERS);
    }

    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      logger.info(`[LoginUserUsecase]: Invalid credentials (User not found)`);
      throw new AppError(ERROR_MESSAGE.INVALID_CREDENTIALS, 401);
    }

    const match = PasswordHashProvider.compare(password, user.password ?? "");
    if (!match) {
      logger.info(`[LoginUserUsecase]: Invalid credentials`);
      throw new AppError(ERROR_MESSAGE.INVALID_CREDENTIALS, 401);
    }

    const payload = { id: user.id };
    const accessToken = AccessTokenProvider.generate(payload, "7d");
    const { password: userPass, ...userToReturn } = user;

    logger.info(`[LoginUserUsecase]: Successfully authenticated`);

    return {
      data: {
        message: "Successfully authenticated",
        accessToken,
        user: userToReturn,
      },
    };
  }
}
