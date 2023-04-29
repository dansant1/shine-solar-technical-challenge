import {
    CacheClient,
} from '../../cache';
import {
    RateLimiterOptions,
} from '../interface';

export abstract class RateLimiter {
    protected readonly keyPrefix: string;
    protected readonly cache: CacheClient;
    protected readonly points: number;
    protected readonly duration: number;
  
    constructor(keyPrefix: string, cache: CacheClient, options: RateLimiterOptions) {
      this.keyPrefix = keyPrefix;
      this.cache = cache;
      this.points = options.points;
      this.duration = options.duration;
    }
  
    abstract getPoints(): Promise<number>;
    abstract consume(): Promise<number>;
}

  

  