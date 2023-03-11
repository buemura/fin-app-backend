import { InMemoryUserRepository } from "../../../../../tests/__mocks__";
import { ERROR_MESSAGE } from "../../../../helpers/errors/messages";
import { RegisterUserUsecase } from "../register-user-usecase";

describe("Register User Usecase test suite", () => {
  let registerUserUsecase: RegisterUserUsecase;

  beforeEach(() => {
    const userRepository = new InMemoryUserRepository();
    registerUserUsecase = new RegisterUserUsecase(userRepository);
  });

  it("should throw if name is missing", async () => {
    const result = registerUserUsecase.execute({
      name: "",
      email: "jane@example.com",
      password: "pass",
    });
    await expect(result).rejects.toThrow(
      ERROR_MESSAGE.MISSING_REQUIRED_PARAMETERS
    );
  });

  it("should throw if email is missing", async () => {
    const result = registerUserUsecase.execute({
      name: "jane",
      email: "",
      password: "pass",
    });
    await expect(result).rejects.toThrow(
      ERROR_MESSAGE.MISSING_REQUIRED_PARAMETERS
    );
  });

  it("should throw if password is missing", async () => {
    const result = registerUserUsecase.execute({
      name: "jane",
      email: "jane@example.com",
      password: "",
    });
    await expect(result).rejects.toThrow(
      ERROR_MESSAGE.MISSING_REQUIRED_PARAMETERS
    );
  });

  it("should throw if user already exists", async () => {
    const result = registerUserUsecase.execute({
      name: "jane",
      email: "john@example.com",
      password: "pass",
    });
    await expect(result).rejects.toThrow(ERROR_MESSAGE.USER_ALREADY_EXISTS);
  });

  it("should properly create user", async () => {
    const result = await registerUserUsecase.execute({
      name: "jane",
      email: "jane@example.com",
      password: "pass",
    });
    expect(result.data).toHaveProperty("id");
    expect(result.data).toHaveProperty("createdAt");
  });
});
