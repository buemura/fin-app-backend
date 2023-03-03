import { AccessTokenProvider } from '@providers/access-token-provider';

export class AccessTokenAdapter {
  static async generate(userId: string): Promise<string> {
    const accessTokenProvider = new AccessTokenProvider();
    const accessToken = await accessTokenProvider.generate(userId);
    return String(accessToken);
  }

  static async verify(accessToken: string): Promise<boolean> {
    const accessTokenProvider = new AccessTokenProvider();
    const isAuthorized = await accessTokenProvider.verify(accessToken);
    return isAuthorized;
  }
}
