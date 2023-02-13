import Redis, { type Redis as RedisClient } from "ioredis";
import { RedisConfig } from "../configs/redis";

export interface IRedisService {
  save: (key: string, value: any) => Promise<void>;
  get: <T>(key: string) => Promise<T | null>;
  remove: (key: string) => Promise<void>;
}

export class RedisService implements IRedisService {
  private readonly client: RedisClient;

  constructor() {
    this.client = new Redis(RedisConfig.config.redis);
  }

  public async save(key: string, value: any): Promise<void> {
    await this.client.set(key, JSON.stringify(value));
  }

  public async get<T>(key: string): Promise<T | null> {
    const data = await this.client.get(key);

    if (!data) {
      return null;
    }

    const parsedData = JSON.parse(data) as T;
    return parsedData;
  }

  public async remove(key: string): Promise<void> {
    await this.client.del(key);
  }
}
