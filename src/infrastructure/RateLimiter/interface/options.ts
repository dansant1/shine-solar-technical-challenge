export interface RateLimiterOptions {
    points: number;
    duration: number;
}

export interface RateLimiterLogarithmicOptions extends RateLimiterOptions {
    factor: number;
}