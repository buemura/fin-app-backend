import { AppError } from "../../helpers/errors/app-error";
import { ERROR_MESSAGE } from "../../helpers/errors/messages";
import { logger } from "../../helpers/logger";
import { AccessTokenProvider } from "../../providers/access-token-provider";
import { PasswordHashProvider } from "../../providers/password-hash-provider";
import { LoginAuthDto, RegisterAuthDto } from "../dtos/auth-dto";
import { ResponseDto } from "../dtos/response-dto";
import { UserRepository } from "../repositories/user-repository";

export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordHashProvider: PasswordHashProvider,
    private readonly accessTokenProvider: AccessTokenProvider
  ) {}

  async register({
    name,
    email,
    password,
  }: RegisterAuthDto): Promise<ResponseDto> {
    logger.info(`Sign up user`);

    if (!name || !email || !password) {
      throw new AppError(ERROR_MESSAGE.MISSING_REQUIRED_PARAMETERS);
    }

    const userExists = await this.userRepository.findByEmail(email);
    if (userExists) {
      throw new AppError(ERROR_MESSAGE.USER_ALREADY_EXISTS);
    }

    const hashedPassword = this.passwordHashProvider.hash(password);
    const newUser = {
      name,
      email,
      password: hashedPassword,
      isExternal: false,
    };

    logger.info(`User created`);
    const user = await this.userRepository.create(newUser);

    return {
      data: user,
    };
  }

  async login({ email, password }: LoginAuthDto): Promise<ResponseDto> {
    logger.info(`Sign in user`);

    if (!email || !password) {
      throw new AppError(ERROR_MESSAGE.MISSING_REQUIRED_PARAMETERS);
    }

    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new AppError(ERROR_MESSAGE.INVALID_CREDENTIALS, 401);
    }

    const match = this.passwordHashProvider.compare(
      password,
      user.password ?? ""
    );
    if (!match) {
      throw new AppError(ERROR_MESSAGE.INVALID_CREDENTIALS, 401);
    }

    const payload = { id: user.id };
    const accessToken = this.accessTokenProvider.generate(payload, "7d");
    const { password: userPass, ...userToReturn } = user;

    logger.info(`Successfully authenticated`);

    return {
      data: {
        message: "Successfully authenticated",
        accessToken,
        user: userToReturn,
      },
    };
  }
}
