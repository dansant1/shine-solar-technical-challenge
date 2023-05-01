import { 
    Request,
    Response, 
    NextFunction,
} from 'express';
import { 
    RateLimiterFactory, 
    RateLimitExceededError, 
    RateLimitConfigError,
    RedisCacheClient,
} from '../../infrastructure';
import {
    RateLimiterMiddlewareOptions,
} from './interface';
import { 
    manageError,
    errors,
} from '../../global';
import ip from 'ip';

function createRateLimiterMiddleware(options: RateLimiterMiddlewareOptions) {
    const { 
        cacheOptions, 
        linear, 
        logarithmic,
    } = options;
    const rateLimiterFactory = new RateLimiterFactory(cacheOptions, { linear, logarithmic });

    return async function rateLimiterMiddleware(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const rateLimiter = rateLimiterFactory.createLinear(`${ip.address()}:${req.method}:${req.originalUrl}`);
            const pointsLeft = await rateLimiter.consume();
            res.setHeader('X-RateLimit-Remaining', pointsLeft);
            next();
        } catch (error) {
            if (error instanceof RateLimitExceededError) {
                return manageError(res, errors.TKO0001, 429);
            } else if (error instanceof RateLimitConfigError) {
                return manageError(res, error);
            } else {
                next(error);
            }
        }
    };
}

const redisCacheClientInstance = RedisCacheClient.create({
    host: process.env.REDIS_HOST,
});

export const rateLimiterMiddleware = createRateLimiterMiddleware({
    cacheOptions: redisCacheClientInstance,
    linear: {
        points: Number(process.env.RATE_LIMITER_LINEAR_POINTS),
        duration: Number(process.env.RATE_LIMITER_LINEAR_DURATION),
    },
    logarithmic: {
        points: Number(process.env.RATE_LIMITER_LOGARITHMIC_POINTS),
        duration: Number(process.env.RATE_LIMITER_LOGARITHMIC_DURATION),
        factor: Number(process.env.RATE_LIMITER_LOGARITHMIC_FACTOR),
    },
});
