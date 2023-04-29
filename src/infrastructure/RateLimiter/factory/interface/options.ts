import {
    RateLimiterOptions,
    RateLimiterLogarithmicOptions,
} from '../../interface';

export interface RateLimiterFactoryOptions {
    linear: RateLimiterOptions;
    logarithmic: RateLimiterLogarithmicOptions;
}
  