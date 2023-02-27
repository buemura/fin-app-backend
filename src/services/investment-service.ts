import {
  CreateInvestmentProps,
  DeleteInvestmentProps,
  FindInvestmentsByUserIdProps,
  FindInvestmentsByUserIdResponse,
  InvestmentProps,
  UpdateInvestmentProps,
} from "../interfaces/investment";
import { IInvestmentRepository, IUserRepository } from "../repositories";
import { AppError } from "../utils/app-error";
import { paginationMetadata, sliceParams } from "../utils/functions";
import { logger } from "../utils/logger";
import { IRedisService } from "./redis-service";

export class InvestmentService {
  private readonly investmentsKey: string =
    process.env.REDIS_INVESTMENTS_KEY ?? "";

  constructor(
    private readonly userRepository: IUserRepository,
    private readonly investmentRepository: IInvestmentRepository,
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
}
