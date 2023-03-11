import { InMemoryAccountRepository } from "../../../../../tests/__mocks__/";
import { DeleteAccountUsecase } from "../delete-account-usecase";

describe("Delete Account Usecase test suite", () => {
  let deleteAccountUsecase: DeleteAccountUsecase;

  beforeEach(() => {
    const accountRepository = new InMemoryAccountRepository();
    deleteAccountUsecase = new DeleteAccountUsecase(accountRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should throw an error if required parameters are missing", async () => {
    const result = deleteAccountUsecase.execute("");
    await expect(result).rejects.toThrow("Missing required parameter");
  });

  it("should throw an error if account is not found", async () => {
    const result = deleteAccountUsecase.execute("not-exists");
    await expect(result).rejects.toThrow("Account not found");
  });

  it("should delete account", async () => {
    const result = await deleteAccountUsecase.execute("account-1");
    expect(result?.data.id).toBe("account-1");
  });
});
