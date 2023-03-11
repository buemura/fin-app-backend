import bcrypt from "bcrypt";

export class PasswordHashProvider {
  static hash(password: string): string {
    const salt = 10;
    const hashedPassword = bcrypt.hashSync(password, salt);
    return hashedPassword;
  }

  static compare(plainTextPassword: string, hashedPassword: string): boolean {
    const isMatch = bcrypt.compareSync(plainTextPassword, hashedPassword);
    return isMatch;
  }
}
