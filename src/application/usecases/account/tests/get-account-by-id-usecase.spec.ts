import { InMemoryAccountRepository } from "../../../../../tests/__mocks__/";
import { GetAccountByIdUsecase } from "../get-account-by-id-usecase";

describe("Get Account By Id Usecase test suite", () => {
  let getAccountByIdUsecase: GetAccountByIdUsecase;

  beforeEach(() => {
    const accountRepository = new InMemoryAccountRepository();
    getAccountByIdUsecase = new GetAccountByIdUsecase(accountRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should throw an error if required parameter is missing", async () => {
    const result = getAccountByIdUsecase.execute("");
    await expect(result).rejects.toThrow("Missing required parameter");
  });

  it("should return users expenses", async () => {
    const result = await getAccountByIdUsecase.execute("account-1");
    expect(result).not.toBe(null);
    expect(result?.data.id).toBe("account-1");
  });
});
