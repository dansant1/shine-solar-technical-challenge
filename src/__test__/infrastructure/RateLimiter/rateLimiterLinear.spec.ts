import { RateLimiterLinear, RateLimitExceededError } from '../../../infrastructure';

// Mock the cache dependency
const cache = {
  get: jest.fn(),
  set: jest.fn(),
};

describe('RateLimiterLinear', () => {
  const keyPrefix = 'test';
  const duration = 60;
  const points = 10;

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getPoints', () => {
    it('should return the value of the key from the cache', async () => {
      cache.get.mockResolvedValue('5');
      const rateLimiter = new RateLimiterLinear(keyPrefix, cache, {
        duration, 
        points
      });

      const result = await rateLimiter.getPoints();

      expect(cache.get).toHaveBeenCalledWith(keyPrefix);
      expect(result).toBe(5);
    });

    it('should return the default points value if key not found in the cache', async () => {
      cache.get.mockResolvedValue(null);
      const rateLimiter = new RateLimiterLinear(keyPrefix, cache, {
        duration, 
        points
      });

      const result = await rateLimiter.getPoints();

      expect(cache.get).toHaveBeenCalledWith(keyPrefix);
      expect(result).toBe(points);
    });
  });

  describe('consume', () => {
    it('should throw RateLimitExceededError if points is 0', async () => {
        const rateLimiter = new RateLimiterLinear(keyPrefix, cache, {
            duration, 
            points
        });
      jest.spyOn(rateLimiter, 'getPoints').mockResolvedValue(0);

      await expect(rateLimiter.consume()).rejects.toThrow(RateLimitExceededError);

      expect(cache.set).not.toHaveBeenCalled();
    });

    it('should decrement points by 1 in the cache and return the updated points value', async () => {
        const rateLimiter = new RateLimiterLinear(keyPrefix, cache, {
            duration, 
            points
        });
      jest.spyOn(rateLimiter, 'getPoints').mockResolvedValue(5);

      const result = await rateLimiter.consume();

      expect(rateLimiter.getPoints).toHaveBeenCalled();
      expect(cache.set).toHaveBeenCalledWith(keyPrefix, '4', 'EX', duration);
      expect(result).toBe(4);
    });
  });
});
