import { InMemoryUserRepository } from "../../../../../tests/__mocks__";
import { ERROR_MESSAGE } from "../../../../helpers/errors/messages";
import { LoginUserUsecase } from "../login-user-usecase";

describe("Login User Usecase test suite", () => {
  let loginUserUsecase: LoginUserUsecase;

  beforeEach(() => {
    const userRepository = new InMemoryUserRepository();
    loginUserUsecase = new LoginUserUsecase(userRepository);
  });

  it("should throw if email is missing", async () => {
    const result = loginUserUsecase.execute({
      email: "",
      password: "pass",
    });
    await expect(result).rejects.toThrow(
      ERROR_MESSAGE.MISSING_REQUIRED_PARAMETERS
    );
  });

  it("should throw if password is missing", async () => {
    const result = loginUserUsecase.execute({
      email: "jane@example.com",
      password: "",
    });
    await expect(result).rejects.toThrow(
      ERROR_MESSAGE.MISSING_REQUIRED_PARAMETERS
    );
  });

  it("should throw if user is not registered", async () => {
    const result = loginUserUsecase.execute({
      email: "jane@example.com",
      password: "pass",
    });
    await expect(result).rejects.toThrow(ERROR_MESSAGE.INVALID_CREDENTIALS);
  });

  it("should throw if password does not match", async () => {
    const result = loginUserUsecase.execute({
      email: "john@example.com",
      password: "pass",
    });
    await expect(result).rejects.toThrow("Invalid credentials");
  });

  it("should properly sign in user", async () => {
    const result = await loginUserUsecase.execute({
      email: "john@example.com",
      password: "password",
    });
    expect(result.data).toHaveProperty("accessToken");
    expect(result.data.message).toBe("Successfully authenticated");
  });
});
