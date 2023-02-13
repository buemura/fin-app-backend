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
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
      password: process.env.REDIS_PASS ?? undefined,
    },
  },
  driver: "redis",
};
