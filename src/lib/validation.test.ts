import { describe, it, expect } from 'vitest';
import { Validator, Ok, Err } from './validation';

describe('Validator', () => {
    it('returns valid when all rules pass', () => {
        const v = new Validator({ x: 1 }, [
            [(o) => o.x === 1, 'x must be 1'],
        ]);
        const [valid, errors] = v.validate();
        expect(valid).toBe(true);
        expect(errors).toHaveLength(0);
    });

    it('returns invalid with error messages when a rule fails', () => {
        const v = new Validator({ x: 2 }, [
            [(o) => o.x === 1, 'x must be 1'],
        ]);
        const [valid, errors] = v.validate();
        expect(valid).toBe(false);
        expect(errors).toContain('x must be 1');
    });

    it('collects all failing rule messages', () => {
        const v = new Validator({ x: 0, y: 0 }, [
            [(o) => o.x === 1, 'x must be 1'],
            [(o) => o.y === 2, 'y must be 2'],
        ]);
        const [, errors] = v.validate();
        expect(errors).toHaveLength(2);
    });

    it('valid() returns true when all rules pass', () => {
        const v = new Validator({ n: 5 }, [[(o) => o.n > 0, 'n must be positive']]);
        expect(v.valid()).toBe(true);
    });

    it('valid() returns false when any rule fails', () => {
        const v = new Validator({ n: -1 }, [[(o) => o.n > 0, 'n must be positive']]);
        expect(v.valid()).toBe(false);
    });
});

describe('Ok', () => {
    it('creates a valid result with the value', () => {
        const result = Ok(42);
        expect(result.valid).toBe(true);
        if (result.valid) {
            expect(result.value).toBe(42);
        }
    });
});

describe('Err', () => {
    it('creates an invalid result with errors', () => {
        const result = Err<number>(['something went wrong']);
        expect(result.valid).toBe(false);
        if (!result.valid) {
            expect(result.errors).toContain('something went wrong');
        }
    });
});
