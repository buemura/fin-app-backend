import { InvestmentTrxService } from "../../../../application/services/investment-trx-service";
import { RedisRepository } from "../../../../infra/cache";
import {
  InvestmentRepository,
  InvestmentTrxRepository,
  UserRepository,
} from "../../../../infra/database";
import { InvestmentTrxController } from "../../controllers/investment-trx-controller";

export function makeInvestmentTrxController(): InvestmentTrxController {
  const redisRepository = new RedisRepository();
  const userRepository = new UserRepository();
  const investmentRepository = new InvestmentRepository(redisRepository);
  const investmentTrxRepository = new InvestmentTrxRepository(redisRepository);
  const investmentTrxService = new InvestmentTrxService(
    userRepository,
    investmentRepository,
    investmentTrxRepository
  );
  const investmentTrxController = new InvestmentTrxController(
    investmentTrxService
  );
  return investmentTrxController;
}
