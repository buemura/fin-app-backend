import {
  InMemoryAccountRepository,
  InMemoryUserRepository,
} from "../../../tests/__mocks__/repositories";
import { DEFAULT_PAGINATION } from "../../utils/constants";
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
      const result = accountService.getAccountById({ id: "" });
      await expect(result).rejects.toThrow("Missing required parameter");
    });

    it("should return users expenses", async () => {
      const result = await accountService.getAccountById({
        id: "account-1",
      });
      expect(result).not.toBe(null);
      expect(result?.id).toBe("account-1");
    });
  });

  describe("Find Accounts by User Id", () => {
    it("should throw an error if required parameters are missing", async () => {
      const result = accountService.getAccountsByUserId({
        userId: "",
        pagination: {
          page: DEFAULT_PAGINATION.PAGE,
          items: DEFAULT_PAGINATION.ITEMS,
        },
      });
      await expect(result).rejects.toThrow("Missing required parameter");
    });

    it("should throw an error if user is not found", async () => {
      const result = accountService.getAccountsByUserId({
        userId: "not-exists",
        pagination: {
          page: DEFAULT_PAGINATION.PAGE,
          items: DEFAULT_PAGINATION.ITEMS,
        },
      });
      await expect(result).rejects.toThrow("User does not exists");
    });

    it("should return users expenses", async () => {
      const result = await accountService.getAccountsByUserId({
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
      const result = accountService.createAccount({
        userId: "",
        name: "",
        balance: 0,
      });
      await expect(result).rejects.toThrow("Missing required parameter");
    });

    it("should throw an error if user is not found", async () => {
      const result = accountService.createAccount({
        userId: "not-exists",
        name: "Nubank",
        balance: 100,
      });
      await expect(result).rejects.toThrow("User does not exists");
    });

    it("should create account", async () => {
      const result = await accountService.createAccount({
        userId: "user-1",
        name: "Nubank",
        balance: 200,
      });
      expect(result).not.toBe(null);
      expect(result.id).toBeDefined();
    });
  });

  describe("Update Account", () => {
    it("should throw an error if required parameters are missing", async () => {
      const result = accountService.updateAccount({
        id: "",
        name: "",
        balance: 0,
      });
      await expect(result).rejects.toThrow("Missing required parameter");
    });

    it("should throw an error if account is not found", async () => {
      const result = accountService.updateAccount({
        id: "not-exists",
        name: "Itau",
        balance: 100,
      });
      await expect(result).rejects.toThrow("Account not found");
    });

    it("should update account", async () => {
      const result = await accountService.updateAccount({
        id: "account-1",
        name: "Itau",
        balance: 200,
      });
      expect(result).not.toBe(null);
      expect(result?.name).toBe("Itau");
    });
  });

  describe("Delete Account", () => {
    it("should throw an error if required parameters are missing", async () => {
      const result = accountService.deleteAccount({
        id: "",
      });
      await expect(result).rejects.toThrow("Missing required parameter");
    });

    it("should throw an error if account is not found", async () => {
      const result = accountService.deleteAccount({
        id: "not-exists",
      });
      await expect(result).rejects.toThrow("Account not found");
    });

    it("should update account", async () => {
      const account = await accountService.getAccountById({ id: "account-1" });
      expect(account?.id).toBeDefined();

      await accountService.deleteAccount({
        id: "account-1",
      });

      const accountAfter = await accountService.getAccountById({
        id: "account-1",
      });
      expect(accountAfter).toBe(null);
    });
  });
});
