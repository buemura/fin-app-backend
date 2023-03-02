import { PasswordAdapter } from '@adapters/password-adapter';

export class PasswordHelper {
  static async hashPassword(password: string): Promise<string> {
    const passwordAdapter = new PasswordAdapter();
    const hashedPassword = await passwordAdapter.hash(password);
    return hashedPassword;
  }

  static async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    const passwordAdapter = new PasswordAdapter();
    const isMatch = await passwordAdapter.compare(password, hashedPassword);
    return isMatch;
  }
}
