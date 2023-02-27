import {
  CreateInvestmentProps,
  DeleteInvestmentProps,
  FindInvestmentsByUserIdProps,
  FindInvestmentsByUserIdResponse,
  InvestmentProps,
  UpdateInvestmentProps,
} from "../interfaces/investment";
import {
  InvestmentTrxProps,
  FindInvestmentsTrxByUserIdProps,
  FindInvestmentsTrxByUserIdResponse,
  CreateInvestmentTrxProps,
  DeleteInvestmentTrxProps,
  UpdateInvestmentTrxProps,
} from "../interfaces/investment-trx";
import {
  IInvestmentRepository,
  IInvestmentTrxRepository,
  IUserRepository,
} from "../repositories";
import { AppError } from "../utils/app-error";
import { paginationMetadata, sliceParams } from "../utils/functions";
import { logger } from "../utils/logger";
import { IRedisService } from "./redis-service";

export class InvestmentService {
  private readonly investmentsKey: string =
    process.env.REDIS_INVESTMENTS_KEY ?? "";

  private readonly investmentsTrxKey: string =
    process.env.REDIS_INVESTMENTS_TRX_KEY ?? "";

  constructor(
    private readonly userRepository: IUserRepository,
    private readonly investmentRepository: IInvestmentRepository,
    private readonly investmentTrxRepository: IInvestmentTrxRepository,
    private readonly redisService: IRedisService
  ) {}

  async findByUserId({
    userId,
    pagination,
  }: FindInvestmentsByUserIdProps): Promise<FindInvestmentsByUserIdResponse> {
    if (!userId) {
      throw new AppError("Missing required parameter");
    }

    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new AppError("User does not exists");
    }

    const { start, end } = sliceParams({
      page: pagination.page,
      items: pagination.items,
    });

    let investments = await this.redisService.get<InvestmentProps[]>(
      this.investmentsKey
    );

    if (!investments) {
      logger.info(`No cache found for user ${userId}`);
      investments = await this.investmentRepository.findMany();
      logger.info(`Creating cache for user ${userId}`);
      await this.redisService.save(this.investmentsKey, investments);
    } else {
      investments = investments.filter(
        (investment) => investment.userId === userId
      );
    }

    const result = investments.slice(start, end);

    const metadata = paginationMetadata({
      data: investments,
      page: pagination.page,
      items: pagination.items,
    });

    return {
      metadata,
      data: result,
    };
  }

  async createInvestment({
    userId,
    accountId,
    category,
    ticker,
    type,
  }: CreateInvestmentProps): Promise<InvestmentProps> {
    if (!userId || !accountId || !category || !ticker || !type) {
      throw new AppError("Missing required parameter");
    }

    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new AppError("User does not exists");
    }

    const result = await this.investmentRepository.create({
      userId,
      accountId,
      category,
      ticker,
      type,
    });

    await this.redisService.remove(this.investmentsKey);

    return result;
  }

  async updateInvestment({
    id,
    accountId,
    category,
    ticker,
    type,
  }: UpdateInvestmentProps): Promise<InvestmentProps | null> {
    if (!id) {
      throw new AppError("Missing required parameter");
    }

    const investment = await this.investmentRepository.findById(id);
    if (!investment) {
      throw new AppError("Investment not found");
    }

    const result = await this.investmentRepository.update({
      id,
      accountId,
      category,
      ticker,
      type,
    });

    await this.redisService.remove(this.investmentsKey);
    return result;
  }

  async deleteInvestment({
    id,
  }: DeleteInvestmentProps): Promise<InvestmentProps | null> {
    if (!id) {
      throw new AppError("Missing required parameter");
    }

    const investment = await this.investmentRepository.findById(id);
    if (!investment) {
      throw new AppError("Investment not found");
    }

    await this.redisService.remove(this.investmentsKey);
    return this.investmentRepository.delete(id);
  }

  async findTrxByUserId({
    userId,
    pagination,
  }: FindInvestmentsTrxByUserIdProps): Promise<FindInvestmentsTrxByUserIdResponse> {
    if (!userId) {
      throw new AppError("Missing required parameter");
    }

    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new AppError("User does not exists");
    }

    const { start, end } = sliceParams({
      page: pagination.page,
      items: pagination.items,
    });

    let investmentsTrx = await this.redisService.get<InvestmentTrxProps[]>(
      this.investmentsTrxKey
    );

    if (!investmentsTrx) {
      logger.info(`No cache found for user ${userId}`);
      investmentsTrx = await this.investmentTrxRepository.findMany();
      logger.info(`Creating cache for user ${userId}`);
      await this.redisService.save(this.investmentsTrxKey, investmentsTrx);
    } else {
      investmentsTrx = investmentsTrx.filter(
        (investment) => investment.userId === userId
      );
    }

    const result = investmentsTrx.slice(start, end);

    const metadata = paginationMetadata({
      data: investmentsTrx,
      page: pagination.page,
      items: pagination.items,
    });

    return {
      metadata,
      data: result,
    };
  }

  async createInvestmentTrx({
    userId,
    investmentId,
    pricePerQuantity,
    quantity,
  }: CreateInvestmentTrxProps): Promise<InvestmentTrxProps> {
    if (!userId || !investmentId || !pricePerQuantity || !quantity) {
      throw new AppError("Missing required parameter");
    }

    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new AppError("User does not exists");
    }

    const result = await this.investmentTrxRepository.create({
      userId,
      investmentId,
      pricePerQuantity,
      quantity,
    });

    await this.updateInvestmentTotalData(investmentId);
    return result;
  }

  async updateInvestmentTrx({
    id,
    investmentId,
    pricePerQuantity,
    quantity,
  }: UpdateInvestmentTrxProps): Promise<InvestmentTrxProps | null> {
    if (!id) {
      throw new AppError("Missing required parameter");
    }

    const investmentTrx = await this.investmentTrxRepository.findById(id);
    if (!investmentTrx) {
      throw new AppError("Investment Transaction not found");
    }

    const result = await this.investmentTrxRepository.update({
      id,
      investmentId,
      pricePerQuantity,
      quantity,
    });

    await this.updateInvestmentTotalData(result?.investmentId ?? "");
    return result;
  }

  async deleteInvestmentTrx({
    id,
  }: DeleteInvestmentTrxProps): Promise<InvestmentTrxProps | null> {
    if (!id) {
      throw new AppError("Missing required parameter");
    }

    const investmentTrx = await this.investmentTrxRepository.findById(id);
    if (!investmentTrx) {
      throw new AppError("Investment Transaction not found");
    }

    await this.redisService.remove(this.investmentsKey);
    const result = await this.investmentTrxRepository.delete(id);
    const investment = await this.investmentRepository.findById(
      investmentTrx.investmentId
    );

    await this.updateInvestmentTotalDataOnDelete(
      investment?.id,
      result?.pricePaid,
      result?.quantity,
      investment?.totalPaidPrice,
      investment?.totalQuantity
    );
    return result;
  }

  private async updateInvestmentTotalData(id: string): Promise<void> {
    logger.info(`Updating Investment Total Data: ${id}`);

    try {
      await this.redisService.remove(this.investmentsKey);
      await this.redisService.remove(this.investmentsTrxKey);

      const { totalPaidPrice, totalQuantity } =
        await this.investmentTrxRepository.getTotalDetails(id);

      await this.investmentRepository.update({
        id,
        totalPaidPrice,
        totalQuantity,
      });

      logger.info(`Successfully Updated Investment Total Data: ${id}`);
      logger.info(
        `Updated Investment Total Data with: totalPaidPrice=${totalPaidPrice} totalQuantity=${totalQuantity}`
      );
    } catch (error: any) {
      logger.error(error.message);
    }
  }

  private async updateInvestmentTotalDataOnDelete(
    id: string = "",
    pricePaid: number = 0,
    quantity: number = 0,
    totalPaidPrice: number = 0,
    totalQuantity: number = 0
  ): Promise<void> {
    logger.info(`Updating Investment Total Data On Delete: ${id}`);

    try {
      await this.redisService.remove(this.investmentsKey);
      await this.redisService.remove(this.investmentsTrxKey);

      await this.investmentRepository.update({
        id,
        totalPaidPrice: totalPaidPrice - pricePaid,
        totalQuantity: totalQuantity - quantity,
      });

      logger.info(
        `Successfully Updated Investment Total Data On Delete: ${id}`
      );
    } catch (error) {}
  }
}
