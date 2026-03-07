import { describe, it, expect } from 'vitest';
import { djb2Hash } from './crypto';

describe('djb2Hash', () => {
    it('returns a non-negative integer', () => {
        expect(djb2Hash('hello')).toBeGreaterThanOrEqual(0);
    });

    it('is deterministic', () => {
        expect(djb2Hash('resumark')).toBe(djb2Hash('resumark'));
    });

    it('produces different values for different inputs', () => {
        expect(djb2Hash('foo')).not.toBe(djb2Hash('bar'));
    });

    it('handles empty string', () => {
        expect(djb2Hash('')).toBe(5381);
    });
});
