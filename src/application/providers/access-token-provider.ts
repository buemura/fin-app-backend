import { JwtService } from '@nestjs/jwt';

export class AccessTokenProvider {
  static async generate(userId: string): Promise<string> {
    const jwtService = new JwtService();

    const payload = { sub: userId };
    const options = {
      privateKey: process.env.ACCESS_TOKEN_SECRET ?? 'secret',
      expiresIn: process.env.ACCESS_TOKEN_EXPIRATION ?? '7d',
    };

    const accessToken = jwtService.sign(payload, options);
    return accessToken;
  }

  static async verify(accessToken: string): Promise<boolean> {
    const jwtService = new JwtService();

    const options = {
      secret: process.env.ACCESS_TOKEN_SECRET ?? 'secret',
    };

    const isValid = await jwtService.verify(accessToken, options);
    return isValid;
  }
}
