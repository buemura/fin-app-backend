import { AccessTokenAdapter } from '@adapters/access-token-adapter';

export class AccessTokenHelper {
  static async generate(userId: string): Promise<string> {
    const accessTokenAdapter = new AccessTokenAdapter();
    const accessToken = await accessTokenAdapter.generate(userId);
    return String(accessToken);
  }

  static async verify(accessToken: string): Promise<boolean> {
    const accessTokenAdapter = new AccessTokenAdapter();
    const isAuthorized = await accessTokenAdapter.verify(accessToken);
    return isAuthorized;
  }
}
