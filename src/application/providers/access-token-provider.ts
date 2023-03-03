export class AccessTokenProvider {
  static async generate(userId: string): Promise<string> {
    return String(userId);
  }

  static async verify(accessToken: string): Promise<boolean> {
    return true;
  }
}
