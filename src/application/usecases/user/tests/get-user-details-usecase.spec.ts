import { InMemoryUserRepository } from "../../../../../tests/__mocks__";
import { ERROR_MESSAGE } from "../../../../helpers/errors/messages";
import { GetUserDetailsUsecase } from "../get-user-details-usecase";

describe("Get User Details Usecase test suite", () => {
  let getUserDetailsUsecase: GetUserDetailsUsecase;

  beforeEach(() => {
    const userRepository = new InMemoryUserRepository();
    getUserDetailsUsecase = new GetUserDetailsUsecase(userRepository);
  });

  it("should throw an error if required parameters are missing", async () => {
    const result = getUserDetailsUsecase.execute("");
    await expect(result).rejects.toThrow(
      ERROR_MESSAGE.MISSING_REQUIRED_PARAMETERS
    );
  });

  it("should throw an error if user is not found", async () => {
    const result = getUserDetailsUsecase.execute("not-exists");

    await expect(result).rejects.toThrow("User not found");
  });

  it("should return user", async () => {
    const result = await getUserDetailsUsecase.execute("user-1");
    expect(result).not.toBeNull();
    expect(result.data.name).toBe("john");
  });
});
