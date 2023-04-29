import Redis, { RedisOptions } from 'ioredis';
import {
    CacheClient
} from '../../cache/interface';

export class RedisCacheClient implements CacheClient {
  private readonly redis: Redis;

  static create(
    redisOptions: RedisOptions,
  ): RedisCacheClient {
    return new RedisCacheClient(redisOptions);
  }

  constructor(
    redisOptions: RedisOptions,
    ) {
    this.redis = new Redis(redisOptions);
  }

  async get(key: string): Promise<string | null> {
    return await this.redis.get(key);
  }

  async set(key: string, value: string, mode: any, duration: number): Promise<string> {
    return await this.redis.set(key, value, mode, duration);
  }
}