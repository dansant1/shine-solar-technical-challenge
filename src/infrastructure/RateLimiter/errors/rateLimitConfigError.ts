export class RateLimitConfigError extends Error {
    constructor() {
      super('Invalid rate limiter configuration');
      this.name = 'RateLimitConfigError';
    }
}
  