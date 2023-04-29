import {
    CacheClient,
} from '../../cache';
import {
    RateLimiterFactoryOptions,
} from './interface';
import {
    RateLimiterLinear,
} from '../rateLimiterLinear';
import {
    RateLimiterLogarithmic
} from '../rateLimiterLogarithmic';

export class RateLimiterFactory {
    private readonly cacheOptions: CacheClient;
    private readonly options: RateLimiterFactoryOptions;
  
    constructor(cacheOptions: CacheClient, options: RateLimiterFactoryOptions) {
      this.cacheOptions = cacheOptions;
      this.options = options;
    }
  
    createLinear(keyPrefix: string): RateLimiterLinear {
      return new RateLimiterLinear(keyPrefix, this.cacheOptions, this.options.linear);
    }
  
    createLogarithmic(keyPrefix: string): RateLimiterLogarithmic {
      return new RateLimiterLogarithmic(keyPrefix, this.cacheOptions, this.options.logarithmic);
    }
}