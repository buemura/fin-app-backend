import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { logger } from "@helpers/logger";
import { IUserRepository } from "@repositories";
import { AppError } from "@utils/app-error";

type GetUserDetailsProps = {
  userId: string;
};

type SignUpProps = {
  name: string;
  email: string;
  password: string;
};

type SignInProps = {
  email: string;
  password: string;
};

export class UserService {
  constructor(private readonly userRepository: IUserRepository) {}

  async getUserDetails({ userId }: GetUserDetailsProps) {
    logger.info(`Getting user ${userId} details`);

    if (!userId) {
      throw new AppError("User id not provided");
    }

    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new AppError("User not found", 404);
    }

    return user;
  }

  async signUpUser({ name, email, password }: SignUpProps) {
    logger.info(`Sign up user`);

    if (!name || !email || !password) {
      throw new AppError("Missing required parameters");
    }

    const userExists = await this.userRepository.findByEmail(email);
    if (userExists) {
      throw new AppError("User already registered");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      name,
      email,
      password: hashedPassword,
      isExternal: false,
    };

    logger.info(`User created`);

    return this.userRepository.create(newUser);
  }

  async signInUser({ email, password }: SignInProps) {
    logger.info(`Sign in user`);

    if (!email || !password) {
      throw new AppError("Missing required parameters");
    }

    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new AppError("User not registered");
    }

    const match = await bcrypt.compare(password, user.password || "");
    if (!match) {
      throw new AppError("Invalid credentials", 401);
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
      message: "Successfully authenticated",
      accessToken,
      user: userToReturn,
    };
  }
}
