import { IntegerRange, Numerics, SafeIntegerType } from "../deps.ts";

type codepoint = number;

export type Plane =
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

export const MIN_VALUE = 0x0;

export const MAX_VALUE = 0x10FFFF;

const _Range = {
  HIGH_SURROGATE: [0xD800, 0xDBFF] as IntegerRange.Tuple<codepoint>,
  LOW_SURROGATE: [0xDC00, 0xDFFF] as IntegerRange.Tuple<codepoint>,
  VS: [0xFE00, 0xFE0F] as IntegerRange.Tuple<codepoint>,
  VSS: [0xE0100, 0xE01EF] as IntegerRange.Tuple<codepoint>,
  MONGOLIAN_VS: [0x180B, 0x180F] as IntegerRange.Tuple<codepoint>,
} as const;

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

export function isInRange(
  codePoint: codepoint,
  range: IntegerRange.Like<codepoint>,
): codePoint is codepoint {
  const { min, max } = IntegerRange.Struct.fromRangeLike(range);
  return _isInRange(codePoint, min, max);
}

export function isInRanges(
  codePoint: codepoint,
  ranges: IntegerRange.Like<codepoint>[],
): codePoint is codepoint {
  if (Array.isArray(ranges) !== true) {
    throw new Error("TODO");
  }

  return ranges.some((range) => isInRange(codePoint, range));
}

const _toStringOptions = {
  minIntegralDigits: 4,
  radix: Numerics.Radix.HEXADECIMAL,
} as const;

export function toString(codePoint: codepoint): string {
  assertCodePoint(codePoint);
  return `U+${SafeIntegerType.toString(codePoint, _toStringOptions)}`;
}

export function planeOf(codePoint: codepoint): Plane {
  assertCodePoint(codePoint);
  return Math.trunc(codePoint / 0x10000) as Plane;
}

export function isInPlanes(
  codePoint: codepoint,
  planes: Plane[],
): codePoint is codepoint {
  //TODO planes is Plane[]

  const plane = planeOf(codePoint);
  return Array.isArray(planes) && planes.includes(plane);
}

export function isBmp(codePoint: codepoint): codePoint is codepoint {
  return isInRange(codePoint, [0, 0x10000]);
}

export function isHighSurrogate(codePoint: codepoint): codePoint is codepoint {
  return isInRange(codePoint, _Range.HIGH_SURROGATE);
}

export function isLowSurrogate(codePoint: codepoint): codePoint is codepoint {
  return isInRange(codePoint, _Range.LOW_SURROGATE);
}

export function isSurrogate(codePoint: codepoint): codePoint is codepoint {
  return isInRanges(codePoint, [_Range.HIGH_SURROGATE, _Range.LOW_SURROGATE]);
}

export function isVariationSelector(
  codePoint: codepoint,
): codePoint is codepoint {
  return isInRanges(codePoint, [_Range.VS, _Range.VSS, _Range.MONGOLIAN_VS]);
}
