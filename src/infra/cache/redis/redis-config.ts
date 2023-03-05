import { type RedisOptions } from "ioredis";

interface ICacheConfig {
  config: {
    redis: RedisOptions;
  };
  driver: string;
}

export const RedisConfig: ICacheConfig = {
  config: {
    redis: {
      host: process.env.REDIS_HOST
        ? String(process.env.REDIS_HOST)
        : "localhost",
      port: process.env.REDIS_PORT ? Number(process.env.REDIS_PORT) : 6379,
      password: process.env.REDIS_PASS
        ? String(process.env.REDIS_PASS)
        : undefined,
    },
  },
  driver: "redis",
};
