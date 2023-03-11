import {
  CreateInvestmentUsecase,
  DeleteInvestmentUsecase,
  GetUserInvestmentsUsecase,
  UpdateInvestmentCurrentPriceUsecase,
  UpdateInvestmentUsecase,
} from "../../../../application/usecases";
import { RedisRepository } from "../../../cache";
import {
  AccountRepository,
  InvestmentRepository,
  UserRepository,
} from "../../../database";
import { InvestmentController } from "../../controllers/investment-controller";

export function makeInvestmentController(): InvestmentController {
  const redisRepository = new RedisRepository();
  const userRepository = new UserRepository();
  const accountRepository = new AccountRepository(redisRepository);
  const investmentRepository = new InvestmentRepository(redisRepository);

  const getUserInvestmentsUsecase = new GetUserInvestmentsUsecase(
    userRepository,
    investmentRepository
  );
  const createInvestmentUsecase = new CreateInvestmentUsecase(
    userRepository,
    accountRepository,
    investmentRepository
  );
  const updateInvestmentUsecase = new UpdateInvestmentUsecase(
    investmentRepository
  );
  const updateInvestmentCurrentPriceUsecase =
    new UpdateInvestmentCurrentPriceUsecase(investmentRepository);
  const deleteInvestmentUsecase = new DeleteInvestmentUsecase(
    investmentRepository
  );

  const investmentController = new InvestmentController(
    getUserInvestmentsUsecase,
    createInvestmentUsecase,
    updateInvestmentUsecase,
    updateInvestmentCurrentPriceUsecase,
    deleteInvestmentUsecase
  );
  return investmentController;
}
