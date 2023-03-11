import { AppError } from "../../../helpers/errors/app-error";
import { ERROR_MESSAGE } from "../../../helpers/errors/messages";
import { logger } from "../../../helpers/logger";
import { PasswordHashProvider } from "../../../providers/password-hash-provider";
import { RegisterAuthDto } from "../../dtos/auth-dto";
import { ResponseDto } from "../../dtos/response-dto";
import { UserRepository } from "../../repositories/user-repository";

export class RegisterUserUsecase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({
    name,
    email,
    password,
  }: RegisterAuthDto): Promise<ResponseDto> {
    if (!name || !email || !password) {
      logger.info(`[RegisterUserUsecase]: Missing required parameters`);
      throw new AppError(ERROR_MESSAGE.MISSING_REQUIRED_PARAMETERS);
    }

    const userExists = await this.userRepository.findByEmail(email);
    if (userExists) {
      logger.info(`[RegisterUserUsecase]: User already exits`);
      throw new AppError(ERROR_MESSAGE.USER_ALREADY_EXISTS);
    }

    const hashedPassword = PasswordHashProvider.hash(password);
    const newUser = {
      name,
      email,
      password: hashedPassword,
      isExternal: false,
    };

    const user = await this.userRepository.create(newUser);
    logger.info(`[RegisterUserUsecase]: User created successfully`);

    return {
      data: user,
    };
  }
}
