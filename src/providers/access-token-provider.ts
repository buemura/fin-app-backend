export abstract class AccessTokenProvider {
  abstract generate(
    payload: string | object | Buffer,
    expiresIn: string
  ): string;
  abstract verify(accessToken: string): void;
}
