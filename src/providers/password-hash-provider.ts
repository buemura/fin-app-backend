export abstract class PasswordHashProvider {
  abstract hash(password: string): string;
  abstract compare(plainTextPassword: string, hashedPassword: string): boolean;
}
