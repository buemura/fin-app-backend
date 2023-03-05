import { ERROR_MESSAGE } from "@helpers/errors/messages";
import { InMemoryUserRepository } from "@tests/__mocks__";
import { UserService } from "../user-service";

describe("User service test suite", () => {
  let userService: UserService;

  beforeEach(() => {
    const userRepository = new InMemoryUserRepository();
    userService = new UserService(userRepository);
  });

  describe("Get user details", () => {
    it("should throw an error if required parameters are missing", async () => {
      const result = userService.findById("");
      await expect(result).rejects.toThrow(
        ERROR_MESSAGE.MISSING_REQUIRED_PARAMETERS
      );
    });

    it("should throw an error if user is not found", async () => {
      const result = userService.findById("not-exists");

      await expect(result).rejects.toThrow("User not found");
    });

    it("should return user", async () => {
      const result = await userService.findById("user-1");
      expect(result).not.toBeNull();
      expect(result.data.name).toBe("john");
    });
  });
});
