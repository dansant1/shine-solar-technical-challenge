import {
    RateLimiter,
} from './interface';
import {
    RateLimitExceededError,
} from './errors';

export class RateLimiterLinear extends RateLimiter {
    async getPoints(): Promise<number> {
      const value = await this.cache.get(this.keyPrefix);
      return value ? parseInt(value, 10) : this.points;
    }
  
    async consume(): Promise<number> {
      const points = await this.getPoints();
      if (points <= 0) {
        throw new RateLimitExceededError();
      }
      await this.cache.set(this.keyPrefix, `${points - 1}`, 'EX', this.duration);
      return points - 1;
    }
}