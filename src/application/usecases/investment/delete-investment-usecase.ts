import { AppError } from "../../../helpers/errors/app-error";
import { ERROR_MESSAGE } from "../../../helpers/errors/messages";
import { logger } from "../../../helpers/logger";
import { ResponseDto } from "../../dtos/response-dto";
import { InvestmentRepository } from "../../repositories/investment-repository";

export class DeleteInvestmentUsecase {
  constructor(private readonly investmentRepository: InvestmentRepository) {}

  async execute(investmentId: string): Promise<ResponseDto> {
    if (!investmentId) {
      logger.info(`[DeleteInvestmentUsecase]: Missing required parameters`);
      throw new AppError(ERROR_MESSAGE.MISSING_REQUIRED_PARAMETERS);
    }

    const investment = await this.investmentRepository.findById(investmentId);
    if (!investment) {
      logger.info(
        `[DeleteInvestmentUsecase]: Investment ${investmentId} not found`
      );
      throw new AppError(ERROR_MESSAGE.INVESTMENT_NOT_FOUND);
    }

    logger.info(
      `[DeleteInvestmentUsecase]: Deleting investment ${investmentId}`
    );
    const result = await this.investmentRepository.delete(investmentId);

    logger.info(
      `[DeleteInvestmentUsecase]: Successfully deleted investment ${investmentId}`
    );
    return {
      data: {
        id: result?.id,
      },
    };
  }
}
