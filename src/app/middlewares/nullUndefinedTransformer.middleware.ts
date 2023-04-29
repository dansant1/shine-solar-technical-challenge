import { 
    Request,
    Response, 
    NextFunction,
} from 'express';
import {
    NullUndefinedRemovalStrategy,
    TransformStrategy,
} from '../../infrastructure';

function requestPayloadTransformMiddleware(strategy: TransformStrategy) {
   return function transformRequestPayload(
    req: Request, 
    res: Response, 
    next: NextFunction
  ) {
      if (req.method === 'POST') {
        req.body = strategy.transform(req.body);
      }
      next();
    }
}
  
const nullUndefinedRemovalStrategyInstance = NullUndefinedRemovalStrategy.create();

export const nullUndefinedRemovalMiddleware = requestPayloadTransformMiddleware(nullUndefinedRemovalStrategyInstance);