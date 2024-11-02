import { Numerics, SafeIntegerType } from "../deps.ts";

type codepoint = number;

// 0～16 0はBMP
type plane = number;

export const MIN_VALUE = 0x0;

export const MAX_VALUE = 0x10FFFF;

const _MIN_HIGH_SURROGATE = 0xD800;
const _MAX_HIGH_SURROGATE = 0xDBFF;
const _MIN_LOW_SURROGATE = 0xDC00;
const _MAX_LOW_SURROGATE = 0xDFFF;

export function isCodePoint(test: unknown): test is codepoint {
  return SafeIntegerType.isInRange(test, MIN_VALUE, MAX_VALUE);
}

export function assertCodePoint(codePoint: unknown): void {
  if (isCodePoint(codePoint) !== true) {
    throw new TypeError("`codePoint` must be a code point.");
  }
}

export function isInRange(
  test: unknown,
  min: codepoint,
  max: codepoint,
): test is codepoint {
  assertCodePoint(min);
  assertCodePoint(max);

  return isCodePoint(test) && (min <= test) && (max >= test);
}

const _toStringOptions = {
  minIntegralDigits: 4,
  radix: Numerics.Radix.HEXADECIMAL,
} as const;

export function toString(codePoint: codepoint): string {
  assertCodePoint(codePoint);
  return `U+${SafeIntegerType.toString(codePoint, _toStringOptions)}`;
}

export function planeOf(codePoint: codepoint): plane {
  assertCodePoint(codePoint);
  return Math.trunc(codePoint / 0x10000) as plane;
}

export function isBmp(test: codepoint): test is codepoint {
  //return (planeOf(test) === _BMP);

  assertCodePoint(test);
  return (test < 0x10000);
}

export function isHighSurrogate(test: codepoint): test is codepoint {
  return isInRange(test, _MIN_HIGH_SURROGATE, _MAX_HIGH_SURROGATE);
}

export function isLowSurrogate(test: codepoint): test is codepoint {
  return isInRange(test, _MIN_LOW_SURROGATE, _MAX_LOW_SURROGATE);
}

export function isSurrogate(test: codepoint): test is codepoint {
  return isInRange(test, _MIN_HIGH_SURROGATE, _MAX_LOW_SURROGATE);
}

//TODO
// export function isVariationSelector(codePoint: codepoint): boolean {
//   assertCodePoint(codePoint);
//   return inRanges(codePoint, _VSS, _checked);
// }
