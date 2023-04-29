import { NullUndefinedRemovalStrategy } from "../../../infrastructure";

describe('NullUndefinedRemovalStrategy', () => {
    it('should remove null and undefined fields from an object', () => {
        const strategy = NullUndefinedRemovalStrategy.create();
        const payload: any = {
            name: 'Daniel',
            age: 25,
            email: null,
            address: undefined,
        };
        const transformed = strategy.transform(payload);
        expect(transformed).toEqual({
            name: 'Daniel',
            age: 25,
        });
    });

    it('should remove null and undefined fields from a nested object', () => {
        const strategy = NullUndefinedRemovalStrategy.create();
        const payload: any = {
            name: 'Daniel',
            age: 25,
            contact: {
              email: null,
              phone: undefined,
            },
        };
        const transformed = strategy.transform(payload);
        expect(transformed).toEqual({
            name: 'Daniel',
            age: 25,
            contact: {},
        });
    });
});
