import { UserService } from "../user-service";
import { InMemoryUserRepository } from "../../repositories";

describe("User service test suite", () => {
  let userService: UserService;

  beforeEach(() => {
    const userRepository = new InMemoryUserRepository();
    userService = new UserService(userRepository);
  });

  describe("Get user details", () => {
    it("should throw an error if required parameters are missing", async () => {
      const result = userService.getUserDetails({ userId: "" });
      await expect(result).rejects.toThrow("User id not provided");
    });

    it("should throw an error if user is not found", async () => {
      const result = userService.getUserDetails({
        userId: "not-exists",
      });

      await expect(result).rejects.toThrow("User not found");
    });

    it("should return user", async () => {
      const result = await userService.getUserDetails({
        userId: "user-1",
      });
      expect(result).not.toBeNull();
      expect(result.data.name).toBe("john");
    });
  });

  describe("Sign up user", () => {
    it("should throw if name is missing", async () => {
      const result = userService.signUpUser({
        name: "",
        email: "jane@example.com",
        password: "pass",
      });
      await expect(result).rejects.toThrow("Missing required parameters");
    });

    it("should throw if email is missing", async () => {
      const result = userService.signUpUser({
        name: "jane",
        email: "",
        password: "pass",
      });
      await expect(result).rejects.toThrow("Missing required parameters");
    });

    it("should throw if password is missing", async () => {
      const result = userService.signUpUser({
        name: "jane",
        email: "jane@example.com",
        password: "",
      });
      await expect(result).rejects.toThrow("Missing required parameters");
    });

    it("should throw if user already exists", async () => {
      const result = userService.signUpUser({
        name: "jane",
        email: "john@example.com",
        password: "pass",
      });
      await expect(result).rejects.toThrow("User already registered");
    });

    it("should properly create user", async () => {
      const result = await userService.signUpUser({
        name: "jane",
        email: "jane@example.com",
        password: "pass",
      });
      expect(result.data).toHaveProperty("id");
      expect(result.data).toHaveProperty("createdAt");
    });
  });

  describe("Sign in user", () => {
    it("should throw if email is missing", async () => {
      const result = userService.signInUser({
        email: "",
        password: "pass",
      });
      await expect(result).rejects.toThrow("Missing required parameters");
    });

    it("should throw if password is missing", async () => {
      const result = userService.signInUser({
        email: "jane@example.com",
        password: "",
      });
      await expect(result).rejects.toThrow("Missing required parameters");
    });

    it("should throw if user is not registered", async () => {
      const result = userService.signInUser({
        email: "jane@example.com",
        password: "pass",
      });
      await expect(result).rejects.toThrow("User not registered");
    });

    it("should throw if password does not match", async () => {
      const result = userService.signInUser({
        email: "john@example.com",
        password: "pass",
      });
      await expect(result).rejects.toThrow("Invalid credentials");
    });

    it("should properly sign in user", async () => {
      const result = await userService.signInUser({
        email: "john@example.com",
        password: "password",
      });
      expect(result.data).toHaveProperty("accessToken");
      expect(result.data.message).toBe("Successfully authenticated");
    });
  });
});
