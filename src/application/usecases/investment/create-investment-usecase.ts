import { AppError } from "../../../helpers/errors/app-error";
import { ERROR_MESSAGE } from "../../../helpers/errors/messages";
import { logger } from "../../../helpers/logger";
import { CreateInvestmentDto } from "../../dtos/investment-dto";
import { ResponseDto } from "../../dtos/response-dto";
import { AccountRepository } from "../../repositories/account-repository";
import { InvestmentRepository } from "../../repositories/investment-repository";
import { UserRepository } from "../../repositories/user-repository";

export class CreateInvestmentUsecase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly accountRepository: AccountRepository,
    private readonly investmentRepository: InvestmentRepository
  ) {}

  async execute({
    userId,
    accountId,
    category,
    ticker,
    type,
  }: CreateInvestmentDto): Promise<ResponseDto> {
    if (!userId || !accountId || !category || !ticker || !type) {
      logger.info(`[CreateInvestmentUsecase]: Missing required parameters`);
      throw new AppError(ERROR_MESSAGE.MISSING_REQUIRED_PARAMETERS);
    }

    const user = await this.userRepository.findById(userId);
    if (!user) {
      logger.info(`[CreateInvestmentUsecase]: User ${userId} not found`);
      throw new AppError(ERROR_MESSAGE.USER_NOT_FOUND);
    }

    const account = await this.accountRepository.findById(accountId);
    if (!account) {
      logger.info(`[CreateInvestmentUsecase]: Account ${accountId} not found`);
      throw new AppError(ERROR_MESSAGE.ACCOUNT_NOT_FOUND);
    }

    const investment = await this.investmentRepository.findByTicker(ticker);
    if (investment) {
      logger.info(
        `[CreateInvestmentUsecase]: Investment ${ticker} already exists`
      );
      throw new AppError(ERROR_MESSAGE.INVESTMENT_ALREADY_EXISTS);
    }

    logger.info(`[CreateInvestmentUsecase]: Creating investment ${ticker}`);
    const result = await this.investmentRepository.create({
      userId,
      accountId,
      category,
      ticker,
      type,
    });

    logger.info(
      `[CreateInvestmentUsecase]: Successfully created investment ${ticker}`
    );
    return {
      data: {
        id: result.id,
      },
    };
  }
}
