import {
    TransformStrategy,
} from './interface';

export class NullUndefinedRemovalStrategy implements TransformStrategy {

    static create(): NullUndefinedRemovalStrategy {
        return new NullUndefinedRemovalStrategy();
    }

    transform(payload: any): any {
      return JSON.parse(JSON.stringify(payload, (k, v) => {
        if (v === null || v === undefined) {
          return undefined;
        }
        return v;
      }));
    }
}