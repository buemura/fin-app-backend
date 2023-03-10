import bcrypt from "bcrypt";
import { PasswordHashProvider } from "../interfaces/password-hash-provider";

export class PasswordHashProviderImpl implements PasswordHashProvider {
  hash(password: string): string {
    const salt = 10;
    const hashedPassword = bcrypt.hashSync(password, salt);
    return hashedPassword;
  }

  compare(plainTextPassword: string, hashedPassword: string): boolean {
    const isMatch = bcrypt.compareSync(plainTextPassword, hashedPassword);
    return isMatch;
  }
}
