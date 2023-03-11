import {
  InMemoryAccountRepository,
  InMemoryUserRepository,
} from "../../../../../tests/__mocks__/";
import { ERROR_MESSAGE } from "../../../../helpers/errors/messages";
import { DEFAULT_PAGINATION } from "../../../../helpers/pagination/constants";
import { GetUserAccountsUsecase } from "../get-user-accounts-usecase";

describe("Get User Accounts Usecase test suite", () => {
  let getUserAccountsUsecase: GetUserAccountsUsecase;

  beforeEach(() => {
    const userRepository = new InMemoryUserRepository();
    const accountRepository = new InMemoryAccountRepository();
    getUserAccountsUsecase = new GetUserAccountsUsecase(
      userRepository,
      accountRepository
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should throw an error if required parameters are missing", async () => {
    const result = getUserAccountsUsecase.execute({
      userId: "",
      pagination: {
        page: DEFAULT_PAGINATION.PAGE,
        items: DEFAULT_PAGINATION.ITEMS,
      },
    });
    await expect(result).rejects.toThrow("Missing required parameter");
  });

  it("should throw an error if user is not found", async () => {
    const result = getUserAccountsUsecase.execute({
      userId: "not-exists",
      pagination: {
        page: DEFAULT_PAGINATION.PAGE,
        items: DEFAULT_PAGINATION.ITEMS,
      },
    });
    await expect(result).rejects.toThrow(ERROR_MESSAGE.USER_NOT_FOUND);
  });

  it("should return users expenses", async () => {
    const result = await getUserAccountsUsecase.execute({
      userId: "user-1",
      pagination: {
        page: DEFAULT_PAGINATION.PAGE,
        items: DEFAULT_PAGINATION.ITEMS,
      },
    });
    expect(result).not.toBe(null);
  });
});
