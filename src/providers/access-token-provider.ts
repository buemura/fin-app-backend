import jsonwebtoken from "jsonwebtoken";
import { AppError } from "../helpers/errors/app-error";
import { ERROR_MESSAGE } from "../helpers/errors/messages";

export class AccessTokenProvider {
  static generate(
    payload: string | object | Buffer,
    expiresIn: string
  ): string {
    const tokenSecret = String(process.env.TOKEN_SECRET);
    const expiration = { expiresIn };

    const accessToken = jsonwebtoken.sign(payload, tokenSecret, expiration);

    return accessToken;
  }

  static verify(accessToken: string): void {
    const tokenSecret = String(process.env.TOKEN_SECRET);
    const isValid = jsonwebtoken.verify(accessToken, tokenSecret);

    if (!isValid) {
      throw new AppError(ERROR_MESSAGE.INVALID_TOKEN, 401);
    }
  }
}
