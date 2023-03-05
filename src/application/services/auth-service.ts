import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { AppError } from "@helpers/errors/app-error";
import { logger } from "@helpers/logger";

import { LoginAuthDto, RegisterAuthDto } from "@application/dtos/auth-dto";
import { ResponseDto } from "@application/dtos/response-dto";
import { ERROR_MESSAGE } from "@helpers/errors/messages";
import { UserRepository } from "../repositories/user-repository";

export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

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

    const hashedPassword = await bcrypt.hash(password, 10);
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

    const match = await bcrypt.compare(password, user.password ?? "");
    if (!match) {
      throw new AppError(ERROR_MESSAGE.INVALID_CREDENTIALS, 401);
    }

    const payload = { id: user.id };
    const expiration = { expiresIn: "7d" };
    const accessToken = jwt.sign(
      payload,
      String(process.env.TOKEN_SECRET),
      expiration
    );
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
