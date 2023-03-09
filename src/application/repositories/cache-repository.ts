export abstract class CacheRepository {
  abstract save(key: string, value: any): Promise<void>;
  abstract get<T>(key: string): Promise<T | null>;
  abstract remove(key: string): Promise<void>;
}
