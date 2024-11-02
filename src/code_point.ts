import { IntegerRange, Numerics, SafeIntegerType } from "../deps.ts";

type codepoint = number;

type plane =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16;

const _BMP: plane = 0;
const _SPUA_B: plane = 16;

export const MIN_VALUE = 0x0;

export const MAX_VALUE = 0x10FFFF;

const _MIN_HIGH_SURROGATE = 0xD800;
const _MAX_HIGH_SURROGATE = 0xDBFF;
const _MIN_LOW_SURROGATE = 0xDC00;
const _MAX_LOW_SURROGATE = 0xDFFF;
const _MIN_VS = 0xFE00;
const _MAX_VS = 0xFE0F;
const _MIN_VSS = 0xE0100;
const _MAX_VSS = 0xE01EF;
const _MIN_MONGOLIAN_VS = 0x180B;
const _MAX_MONGOLIAN_VS = 0x180F;

export function isCodePoint(test: unknown): test is codepoint {
  return SafeIntegerType.isInRange(test, MIN_VALUE, MAX_VALUE);
}

export function assertCodePoint(codePoint: unknown): void {
  if (isCodePoint(codePoint) !== true) {
    throw new TypeError("`codePoint` must be a code point.");
  }
}

function _isInRange(
  codePoint: codepoint,
  min: codepoint,
  max: codepoint,
): codePoint is codepoint {
  assertCodePoint(min);
  assertCodePoint(max);

  return isCodePoint(codePoint) && (min <= codePoint) && (max >= codePoint);
}

export function isInRanges(
  codePoint: codepoint,
  ranges: IntegerRange.Like<codepoint>[],
): codePoint is codepoint {
  if (Array.isArray(ranges) !== true) {
    throw new TypeError("`ranges` must be a array of code point range.");
    // rangesの各要素についてはisInRangeでチェックされるのでここではチェックしない
  }

  let parsedRanges;
  try {
    parsedRanges = ranges.map((range) =>
      IntegerRange.Struct.fromRangeLike(range)
    );
  } catch {
    throw new TypeError("`range` must be a code point range.");
  }

  return parsedRanges.some((range) =>
    _isInRange(codePoint, range.min, range.max)
  );
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

export function isInPlanes(
  codePoint: codepoint,
  planes: plane[],
): codePoint is codepoint {
  if (
    (Array.isArray(planes) &&
      planes.every((plane) =>
        SafeIntegerType.isInRange(plane, _BMP, _SPUA_B)
      )) !== true
  ) {
    throw new TypeError("`planes` must be a array of planes.");
  }

  return planes.includes(planeOf(codePoint));
}

export function isBmp(codePoint: codepoint): codePoint is codepoint {
  return _isInRange(codePoint, MIN_VALUE, 0xFFFF);
}

export function isHighSurrogate(codePoint: codepoint): codePoint is codepoint {
  return _isInRange(codePoint, _MIN_HIGH_SURROGATE, _MAX_HIGH_SURROGATE);
}

export function isLowSurrogate(codePoint: codepoint): codePoint is codepoint {
  return _isInRange(codePoint, _MIN_LOW_SURROGATE, _MAX_LOW_SURROGATE);
}

export function isSurrogate(codePoint: codepoint): codePoint is codepoint {
  return _isInRange(codePoint, _MIN_HIGH_SURROGATE, _MAX_LOW_SURROGATE);
}

export function isVariationSelector(
  codePoint: codepoint,
): codePoint is codepoint {
  return _isInRange(codePoint, _MIN_VS, _MAX_VS) ||
    _isInRange(codePoint, _MIN_VSS, _MAX_VSS) ||
    _isInRange(codePoint, _MIN_MONGOLIAN_VS, _MAX_MONGOLIAN_VS);
}
