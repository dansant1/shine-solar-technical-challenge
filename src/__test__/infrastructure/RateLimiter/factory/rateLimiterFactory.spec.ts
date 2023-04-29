import { 
    CacheClient,
    RateLimiterFactory, 
    RateLimiterFactoryOptions,
    RateLimiterLinear,
    RateLimiterLogarithmic,
} from '../../../../infrastructure';

describe('RateLimiterFactory', () => {
  let cacheClient: CacheClient;
  let factoryOptions: RateLimiterFactoryOptions;
  let factory: RateLimiterFactory;

  beforeEach(() => {
    cacheClient = {
      get: jest.fn(),
      set: jest.fn(),
    };
    factoryOptions = {
      linear: {
        points: 10,
        duration: 60,
      },
      logarithmic: {
        points: 10,
        duration: 60,
        factor: 0.5,
      },
    };
    factory = new RateLimiterFactory(cacheClient, factoryOptions);
  });

  describe('createLinear method', () => {
    it('should create a new RateLimiterLinear instance', () => {
      const keyPrefix = 'my-key';
      const rateLimiter = factory.createLinear(keyPrefix);
      expect(rateLimiter).toBeInstanceOf(RateLimiterLinear);
    });
  });

  describe('createLogarithmic method', () => {
    it('should create a new RateLimiterLogarithmic instance', () => {
      const keyPrefix = 'my-key';
      const rateLimiter = factory.createLogarithmic(keyPrefix);
      expect(rateLimiter).toBeInstanceOf(RateLimiterLogarithmic);
    });
  });
});
