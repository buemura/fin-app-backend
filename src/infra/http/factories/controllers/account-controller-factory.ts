import {
  CreateAccountUsecase,
  DeleteAccountUsecase,
  GetAccountByIdUsecase,
  GetUserAccountsUsecase,
  UpdateAccountUsecase,
} from "../../../../application/usecases";
import { RedisRepository } from "../../../cache";
import { AccountRepository, UserRepository } from "../../../database";
import { AccountController } from "../../controllers/account-controller";

export function makeAccountController(): AccountController {
  const redisRepository = new RedisRepository();
  const userRepository = new UserRepository();
  const accountRepository = new AccountRepository(redisRepository);

  const getAccountByIdUsecase = new GetAccountByIdUsecase(accountRepository);
  const getUserAccountsUsecase = new GetUserAccountsUsecase(
    userRepository,
    accountRepository
  );
  const createAccountUsecase = new CreateAccountUsecase(
    userRepository,
    accountRepository
  );
  const updateAccountUsecase = new UpdateAccountUsecase(accountRepository);
  const deleteAccountUsecase = new DeleteAccountUsecase(accountRepository);

  const accountController = new AccountController(
    getAccountByIdUsecase,
    getUserAccountsUsecase,
    createAccountUsecase,
    updateAccountUsecase,
    deleteAccountUsecase
  );
  return accountController;
}
