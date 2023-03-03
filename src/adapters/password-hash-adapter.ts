import { PasswordHashProvider } from '@providers/password-hash-provider';

export class PasswordHashAdapter {
  static async hashPassword(password: string): Promise<string> {
    const passwordHashProvider = new PasswordHashProvider();
    const hashedPassword = await passwordHashProvider.hash(password);
    return hashedPassword;
  }

  static async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    const passwordHashProvider = new PasswordHashProvider();
    const isMatch = await passwordHashProvider.compare(
      password,
      hashedPassword,
    );
    return isMatch;
  }
}
