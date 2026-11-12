import { describe, it, expect } from 'vitest';
import { validateCoupon } from '../src/order';

describe('validateCoupon', () => {
  it.each(['ABC-1234', 'XYZ-0000', 'QWE-9876'])('приймає коректний промокод %s', (code) => {
    expect(validateCoupon(code)).toBe(true);
  });

  it.each([
    '',
    'abc-1234',
    'AB-1234',
    'ABCD-1234',
    'ABC1234',
    'ABC-123',
    'ABC-12345',
    'ABC-12A4',
    ' ABC-1234',
    'ABC-1234 ',
    'АВС-1234',
  ])('відхиляє промокод неправильного формату: %s', (code) => {
    expect(validateCoupon(code)).toBe(false);
  });

  it('викидає власний виняток, якщо замість рядка передано інший тип', () => {
    expect(() => validateCoupon(1234 as unknown as string)).toThrow('INVALID_COUPON_INPUT');
  });

  it.each([
    { code: 'ABC-123', expected: false },
    { code: 'ABC-1234', expected: true },
    { code: 'ABC-12345', expected: false },
  ])('перевіряє граничну кількість цифр у коді $code', ({ code, expected }) => {
    expect(validateCoupon(code)).toBe(expected);
  });
});
