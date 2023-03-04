import Redis, { type Redis as RedisClient } from "ioredis";
import { RedisConfig } from "../../../configs/redis";
import { logger } from "../../../utils/logger";
import { CacheRepository } from "../../interfaces/cache-repository";

export class RedisRepository implements CacheRepository {
  private readonly client: RedisClient;

  constructor() {
    this.client = new Redis(RedisConfig.config.redis);
  }

  public async save(key: string, value: any): Promise<void> {
    logger.info(`Saving cache for key: ${key}`);
    await this.client.set(key, JSON.stringify(value));
  }

  public async get<T>(key: string): Promise<T | null> {
    const data = await this.client.get(key);

    if (!data) {
      logger.info(`No cache found for key: ${key}`);
      return null;
    }

    logger.info(`Got cache for key: ${key}`);
    const parsedData = JSON.parse(data) as T;
    return parsedData;
  }

  public async remove(key: string): Promise<void> {
    logger.info(`Removing cache for key: ${key}`);
    await this.client.del(key);
  }
}
