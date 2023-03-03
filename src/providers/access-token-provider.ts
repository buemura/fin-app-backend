export class AccessTokenProvider {
  async generate(userId: string): Promise<string> {
    return String(userId);
  }

  async verify(accessToken: string): Promise<boolean> {
    return true;
  }
}
