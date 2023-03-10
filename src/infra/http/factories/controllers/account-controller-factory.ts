import { AccountService } from "../../../../application/services/account-service";
import { RedisRepository } from "../../../../infra/cache";
import { AccountRepository, UserRepository } from "../../../../infra/database";
import { AccountController } from "../../controllers/account-controller";

export function makeAccountController(): AccountController {
  const redisRepository = new RedisRepository();
  const userRepository = new UserRepository();
  const accountRepository = new AccountRepository(redisRepository);
  const accountService = new AccountService(userRepository, accountRepository);
  const accountController = new AccountController(accountService);
  return accountController;
}
