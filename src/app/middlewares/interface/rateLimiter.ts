import { 
    RedisCacheClient,
} from '../../../infrastructure/cache';

export interface RateLimiterMiddlewareOptions {
    cacheOptions: RedisCacheClient;
    linear: { points: number; duration: number };
    logarithmic: { points: number; duration: number; factor: number };
}
  