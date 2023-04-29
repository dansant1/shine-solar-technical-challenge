import { CacheClient, RateLimiterLogarithmic, RateLimiterLogarithmicOptions, RateLimitExceededError } from '../../../infrastructure';

jest.mock('../../../infrastructure/cache');

describe('RateLimiterLogarithmic', () => {
  let cacheClient: jest.Mocked<CacheClient>;
  let rateLimiter: RateLimiterLogarithmic;

  const keyPrefix = 'test-key-prefix';
  const options: RateLimiterLogarithmicOptions = {
    points: 10,
    duration: 60,
    factor: 2,
  };

  beforeEach(() => {
    cacheClient = {
      get: jest.fn(),
      set: jest.fn(),
    } as unknown as jest.Mocked<CacheClient>;
    rateLimiter = new RateLimiterLogarithmic(keyPrefix, cacheClient, options);
  });

  describe('getPoints', () => {
    it('should return points from cache when value is present', async () => {
      cacheClient.get.mockResolvedValueOnce('5');
      const points = await rateLimiter.getPoints();
      expect(points).toBe(10);
      expect(cacheClient.get).toHaveBeenCalledWith(keyPrefix);
    });

    it('should return default points when cache is empty', async () => {
      cacheClient.get.mockResolvedValueOnce(null);
      const points = await rateLimiter.getPoints();
      expect(points).toBe(10);
      expect(cacheClient.get).toHaveBeenCalledWith(keyPrefix);
    });
  });

  describe('consume', () => {
    it('should decrement points and return new value when points is greater than zero', async () => {
      cacheClient.get.mockResolvedValueOnce('5');
      const newPoints = await rateLimiter.consume();
      expect(newPoints).toBe(9);
      expect(cacheClient.set).toHaveBeenCalledWith(
        keyPrefix,
        `${(10 - 1) / 2}`,
        'EX',
        options.duration,
      );
    });

    it('should throw RateLimitExceededError when points is zero', async () => {
      cacheClient.get.mockResolvedValueOnce('0');
      await expect(rateLimiter.consume()).rejects.toThrow(RateLimitExceededError);
      expect(cacheClient.set).not.toHaveBeenCalled();
    });
  });
});
