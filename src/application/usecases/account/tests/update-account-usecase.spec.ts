import { InMemoryAccountRepository } from "../../../../../tests/__mocks__/";
import { UpdateAccountUsecase } from "../update-account-usecase";

describe("Update Account Usecase test suite", () => {
  let updateAccountUsecase: UpdateAccountUsecase;

  beforeEach(() => {
    const accountRepository = new InMemoryAccountRepository();
    updateAccountUsecase = new UpdateAccountUsecase(accountRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should throw an error if required parameters are missing", async () => {
    const result = updateAccountUsecase.execute({
      accountId: "",
      name: "",
      balance: 0,
    });
    await expect(result).rejects.toThrow("Missing required parameter");
  });

  it("should throw an error if account is not found", async () => {
    const result = updateAccountUsecase.execute({
      accountId: "not-exists",
      name: "Itau",
      balance: 100,
    });
    await expect(result).rejects.toThrow("Account not found");
  });

  it("should update account", async () => {
    const result = await updateAccountUsecase.execute({
      accountId: "account-1",
      name: "Itau",
      balance: 200,
    });

    expect(result).not.toBe(null);
    expect(result?.data.id).toBe("account-1");
  });
});
