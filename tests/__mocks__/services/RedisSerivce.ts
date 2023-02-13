import { IRedisService } from "../../../src/services/redis-service";

interface Cache {
  [key: string]: any;
  "fin-app-EXPENSES_LIST": string;
  "fin-app-ACCOUNTS_LIST": string;
}

export class RedisService implements IRedisService {
  private cache: Cache = {
    "fin-app-EXPENSES_LIST": "",
    "fin-app-ACCOUNTS_LIST": "",
  };

  public async save(key: string, value: any): Promise<void> {
    this.cache[key] = JSON.stringify(value);
  }

  public async get<T>(key: string): Promise<T | null> {
    const data = this.cache[key];

    if (!data) {
      return null;
    }

    const parsedData = JSON.parse(data) as T;
    return parsedData;
  }

  public async remove(key: string): Promise<void> {
    delete this.cache[key];
  }
}
