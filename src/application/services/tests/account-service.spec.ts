import { ERROR_MESSAGE } from "@helpers/errors/messages";
import { DEFAULT_PAGINATION } from "@helpers/pagination/constants";
import {
  InMemoryAccountRepository,
  InMemoryUserRepository,
} from "@tests/__mocks__/";
import { AccountService } from "../account-service";

describe("Account service test suite", () => {
  let accountService: AccountService;

  beforeEach(() => {
    const userRepository = new InMemoryUserRepository();
    const accountRepository = new InMemoryAccountRepository();
    accountService = new AccountService(userRepository, accountRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Find Account by Id", () => {
    it("should throw an error if required parameter is missing", async () => {
      const result = accountService.findById("");
      await expect(result).rejects.toThrow("Missing required parameter");
    });

    it("should return users expenses", async () => {
      const result = await accountService.findById("account-1");
      expect(result).not.toBe(null);
      expect(result?.data.id).toBe("account-1");
    });
  });

  describe("Find Accounts by User Id", () => {
    it("should throw an error if required parameters are missing", async () => {
      const result = accountService.findByUserId({
        userId: "",
        pagination: {
          page: DEFAULT_PAGINATION.PAGE,
          items: DEFAULT_PAGINATION.ITEMS,
        },
      });
      await expect(result).rejects.toThrow("Missing required parameter");
    });

    it("should throw an error if user is not found", async () => {
      const result = accountService.findByUserId({
        userId: "not-exists",
        pagination: {
          page: DEFAULT_PAGINATION.PAGE,
          items: DEFAULT_PAGINATION.ITEMS,
        },
      });
      await expect(result).rejects.toThrow(ERROR_MESSAGE.USER_NOT_FOUND);
    });

    it("should return users expenses", async () => {
      const result = await accountService.findByUserId({
        userId: "user-1",
        pagination: {
          page: DEFAULT_PAGINATION.PAGE,
          items: DEFAULT_PAGINATION.ITEMS,
        },
      });
      expect(result).not.toBe(null);
    });
  });

  describe("Create Account", () => {
    it("should throw an error if required parameters are missing", async () => {
      const result = accountService.create({
        userId: "",
        name: "",
        balance: 0,
      });
      await expect(result).rejects.toThrow(
        ERROR_MESSAGE.MISSING_REQUIRED_PARAMETERS
      );
    });

    it("should throw an error if user is not found", async () => {
      const result = accountService.create({
        userId: "not-exists",
        name: "Nubank",
        balance: 100,
      });
      await expect(result).rejects.toThrow(ERROR_MESSAGE.USER_NOT_FOUND);
    });

    it("should create account", async () => {
      const result = await accountService.create({
        userId: "user-1",
        name: "Nubank",
        balance: 200,
      });
      expect(result).not.toBe(null);
      expect(result.data.id).toBeDefined();
    });
  });

  describe("Update Account", () => {
    it("should throw an error if required parameters are missing", async () => {
      const result = accountService.update({
        accountId: "",
        name: "",
        balance: 0,
      });
      await expect(result).rejects.toThrow("Missing required parameter");
    });

    it("should throw an error if account is not found", async () => {
      const result = accountService.update({
        accountId: "not-exists",
        name: "Itau",
        balance: 100,
      });
      await expect(result).rejects.toThrow("Account not found");
    });

    it("should update account", async () => {
      const result = await accountService.update({
        accountId: "account-1",
        name: "Itau",
        balance: 200,
      });

      expect(result).not.toBe(null);
      expect(result?.data.id).toBe("account-1");
    });
  });

  describe("Delete Account", () => {
    it("should throw an error if required parameters are missing", async () => {
      const result = accountService.delete("");
      await expect(result).rejects.toThrow("Missing required parameter");
    });

    it("should throw an error if account is not found", async () => {
      const result = accountService.delete("not-exists");
      await expect(result).rejects.toThrow("Account not found");
    });

    it("should delete account", async () => {
      const account = await accountService.findById("account-1");
      expect(account?.data.createdAt).toBeDefined();

      const deletedAccount = await accountService.delete("account-1");
      expect(deletedAccount?.data.id).toBe("account-1");

      const accountAfter = await accountService.findById("account-1");
      expect(accountAfter.data).toBe(null);
    });
  });
});
