import {
  InMemoryAccountRepository,
  InMemoryUserRepository,
} from "../../../../../tests/__mocks__/";
import { ERROR_MESSAGE } from "../../../../helpers/errors/messages";
import { CreateAccountUsecase } from "../create-account-usecase";

describe("Create Account Usecase test suite", () => {
  let createAccountUsecase: CreateAccountUsecase;

  beforeEach(() => {
    const userRepository = new InMemoryUserRepository();
    const accountRepository = new InMemoryAccountRepository();
    createAccountUsecase = new CreateAccountUsecase(
      userRepository,
      accountRepository
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should throw an error if required parameters are missing", async () => {
    const result = createAccountUsecase.execute({
      userId: "",
      name: "",
      balance: 0,
    });
    await expect(result).rejects.toThrow(
      ERROR_MESSAGE.MISSING_REQUIRED_PARAMETERS
    );
  });

  it("should throw an error if user is not found", async () => {
    const result = createAccountUsecase.execute({
      userId: "not-exists",
      name: "Nubank",
      balance: 100,
    });
    await expect(result).rejects.toThrow(ERROR_MESSAGE.USER_NOT_FOUND);
  });

  it("should create account", async () => {
    const result = await createAccountUsecase.execute({
      userId: "user-1",
      name: "Nubank",
      balance: 200,
    });
    expect(result).not.toBe(null);
    expect(result.data.id).toBeDefined();
  });
});
