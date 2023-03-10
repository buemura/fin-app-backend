import { InvestmentService } from "../../../../application/services/investment-service";
import { RedisRepository } from "../../../cache";
import {
  AccountRepository,
  InvestmentRepository,
  UserRepository,
} from "../../../database";
import { StockPricesProviderImpl } from "../../../providers/stocks-price-provider";
import { InvestmentController } from "../../controllers/investment-controller";

export function makeInvestmentController(): InvestmentController {
  const redisRepository = new RedisRepository();
  const userRepository = new UserRepository();
  const accountRepository = new AccountRepository(redisRepository);
  const investmentRepository = new InvestmentRepository(redisRepository);

  const stockPricesProvider = new StockPricesProviderImpl();

  const investmentService = new InvestmentService(
    userRepository,
    accountRepository,
    investmentRepository,
    stockPricesProvider
  );
  const investmentController = new InvestmentController(investmentService);
  return investmentController;
}
