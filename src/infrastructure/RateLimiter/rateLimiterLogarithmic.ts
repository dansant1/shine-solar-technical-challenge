import {
    RateLimiter,
    RateLimiterLogarithmicOptions,
} from './interface';
import {
    RateLimitExceededError,
} from './errors';
import {
    CacheClient
} from '../cache';

export class RateLimiterLogarithmic extends RateLimiter {
    protected readonly factor: number;
  
    constructor(
      keyPrefix: string,
      cache: CacheClient,
      options: RateLimiterLogarithmicOptions,
    ) {
      super(keyPrefix, cache, options);
      this.factor = options.factor;
    }
  
    async getPoints(): Promise<number> {
      const value = await this.cache.get(this.keyPrefix);
      return value ? Math.floor(parseFloat(value) * this.factor) : this.points;
    }
  
    async consume(): Promise<number> {
      const points = await this.getPoints();
      if (points <= 0) {
        throw new RateLimitExceededError();
      }
      await this.cache.set(this.keyPrefix, `${(points - 1) / this.factor}`, 'EX', this.duration);
      return points - 1;
    }
}
 