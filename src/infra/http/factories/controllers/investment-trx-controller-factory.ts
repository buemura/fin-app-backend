import {
  CreateInvestmentTrxUsecase,
  DeleteInvestmentTrxUsecase,
  GetUserInvestmentTrxsUsecase,
  InvestmentTotalsDecrementUsecase,
  InvestmentTotalsIncrementUsecase,
  UpdateInvestmentTrxUsecase,
} from "../../../../application/usecases";
import { RedisRepository } from "../../../cache";
import {
  InvestmentRepository,
  InvestmentTrxRepository,
  UserRepository,
} from "../../../database";
import { InvestmentTrxController } from "../../controllers/investment-trx-controller";

export function makeInvestmentTrxController(): InvestmentTrxController {
  const redisRepository = new RedisRepository();
  const userRepository = new UserRepository();
  const investmentRepository = new InvestmentRepository(redisRepository);
  const investmentTrxRepository = new InvestmentTrxRepository(redisRepository);

  const investmentTotalsIncrementUsecase = new InvestmentTotalsIncrementUsecase(
    investmentRepository
  );
  const investmentTotalsDecrementUsecase = new InvestmentTotalsDecrementUsecase(
    investmentRepository
  );

  const getUserInvestmentTrxsUsecase = new GetUserInvestmentTrxsUsecase(
    userRepository,
    investmentTrxRepository
  );
  const createInvestmentTrxUsecase = new CreateInvestmentTrxUsecase(
    userRepository,
    investmentRepository,
    investmentTrxRepository,
    investmentTotalsIncrementUsecase
  );
  const updateInvestmentTrxUsecase = new UpdateInvestmentTrxUsecase(
    investmentRepository,
    investmentTrxRepository,
    investmentTotalsIncrementUsecase,
    investmentTotalsDecrementUsecase
  );
  const deleteInvestmentTrxUsecase = new DeleteInvestmentTrxUsecase(
    investmentRepository,
    investmentTrxRepository,
    investmentTotalsDecrementUsecase
  );

  const investmentTrxController = new InvestmentTrxController(
    getUserInvestmentTrxsUsecase,
    createInvestmentTrxUsecase,
    updateInvestmentTrxUsecase,
    deleteInvestmentTrxUsecase
  );
  return investmentTrxController;
}
