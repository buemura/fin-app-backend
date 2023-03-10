import { InMemoryUserRepository } from "../../../../tests/__mocks__";
import { ERROR_MESSAGE } from "../../../helpers/errors/messages";
import { AccessTokenProviderImpl } from "../../../providers/implementation/access-token-provider";
import { PasswordHashProviderImpl } from "../../../providers/implementation/password-hash-provider";
import { AuthService } from "../auth-service";

describe("User service test suite", () => {
  let authService: AuthService;

  beforeEach(() => {
    const userRepository = new InMemoryUserRepository();
    const passwordHashProvider = new PasswordHashProviderImpl();
    const accessTokenProvider = new AccessTokenProviderImpl();
    authService = new AuthService(
      userRepository,
      passwordHashProvider,
      accessTokenProvider
    );
  });

  describe("Register user", () => {
    it("should throw if name is missing", async () => {
      const result = authService.register({
        name: "",
        email: "jane@example.com",
        password: "pass",
      });
      await expect(result).rejects.toThrow(
        ERROR_MESSAGE.MISSING_REQUIRED_PARAMETERS
      );
    });

    it("should throw if email is missing", async () => {
      const result = authService.register({
        name: "jane",
        email: "",
        password: "pass",
      });
      await expect(result).rejects.toThrow(
        ERROR_MESSAGE.MISSING_REQUIRED_PARAMETERS
      );
    });

    it("should throw if password is missing", async () => {
      const result = authService.register({
        name: "jane",
        email: "jane@example.com",
        password: "",
      });
      await expect(result).rejects.toThrow(
        ERROR_MESSAGE.MISSING_REQUIRED_PARAMETERS
      );
    });

    it("should throw if user already exists", async () => {
      const result = authService.register({
        name: "jane",
        email: "john@example.com",
        password: "pass",
      });
      await expect(result).rejects.toThrow(ERROR_MESSAGE.USER_ALREADY_EXISTS);
    });

    it("should properly create user", async () => {
      const result = await authService.register({
        name: "jane",
        email: "jane@example.com",
        password: "pass",
      });
      expect(result.data).toHaveProperty("id");
      expect(result.data).toHaveProperty("createdAt");
    });
  });

  describe("Sign in user", () => {
    it("should throw if email is missing", async () => {
      const result = authService.login({
        email: "",
        password: "pass",
      });
      await expect(result).rejects.toThrow(
        ERROR_MESSAGE.MISSING_REQUIRED_PARAMETERS
      );
    });

    it("should throw if password is missing", async () => {
      const result = authService.login({
        email: "jane@example.com",
        password: "",
      });
      await expect(result).rejects.toThrow(
        ERROR_MESSAGE.MISSING_REQUIRED_PARAMETERS
      );
    });

    it("should throw if user is not registered", async () => {
      const result = authService.login({
        email: "jane@example.com",
        password: "pass",
      });
      await expect(result).rejects.toThrow(ERROR_MESSAGE.INVALID_CREDENTIALS);
    });

    it("should throw if password does not match", async () => {
      const result = authService.login({
        email: "john@example.com",
        password: "pass",
      });
      await expect(result).rejects.toThrow("Invalid credentials");
    });

    it("should properly sign in user", async () => {
      const result = await authService.login({
        email: "john@example.com",
        password: "password",
      });
      expect(result.data).toHaveProperty("accessToken");
      expect(result.data.message).toBe("Successfully authenticated");
    });
  });
});
