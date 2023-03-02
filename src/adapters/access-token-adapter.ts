import * as crypto from 'crypto';

export class AccessTokenAdapter {
  async generate(userId: string): Promise<crypto.Hash> {
    return crypto.createHash('sha256');
  }

  async verify(accessToken: string): Promise<boolean> {
    return true;
  }
}
