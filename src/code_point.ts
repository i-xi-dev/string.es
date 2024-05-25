import { NumberEx, NumberRange } from "../deps.ts";

function _isPlane(test: unknown): test is CodePoint.Plane {
  return Number.isSafeInteger(test) &&
    NumberEx.inRange(test as number, [0, 16]);
}

const BlockRange = {
  HIGH_SURROGATE: [0xD800, 0xDBFF] as NumberRange,
  LOW_SURROGATE: [0xDC00, 0xDFFF] as NumberRange,
} as const;

const SURROGATE_RANGE = [0xD800, 0xDFFF] as NumberRange;

// 事実上定義できないのでnumberの別名とする
export type CodePoint = number;

export namespace CodePoint {
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

  export function isCodePoint(test: unknown): test is CodePoint {
    return Number.isSafeInteger(test) &&
      NumberEx.inRange(test as number, [MIN_VALUE, MAX_VALUE]);
  }

  export function toString(codePoint: CodePoint): string {
    if (isCodePoint(codePoint)) {
      return `U+${codePoint.toString(16).toUpperCase().padStart(4, "0")}`;
    }
    throw new TypeError("codePoint");
  }

  //TODO
  // export function inBlock(test: unknown, block: Block): boolean {
  // }

  export function isHighSurrogate(test: unknown): boolean {
    if (isCodePoint(test) !== true) {
      return false;
    }
    return NumberEx.inRange(test as number, BlockRange.HIGH_SURROGATE);
  }

  export function isLowSurrogate(test: unknown): boolean {
    if (isCodePoint(test) !== true) {
      return false;
    }
    return NumberEx.inRange(test as number, BlockRange.LOW_SURROGATE);
  }

  export function isSurrogate(test: unknown): boolean {
    if (isCodePoint(test) !== true) {
      return false;
    }
    return NumberEx.inRange(test as number, SURROGATE_RANGE);
  }

  export function planeOf(codePoint: CodePoint): Plane {
    if (isCodePoint(codePoint) !== true) {
      throw new TypeError("codePoint");
    }
    return Math.trunc(codePoint / 0x10000) as Plane;
  }

  export function inPlane(test: unknown, plane: Plane): boolean {
    if (_isPlane(plane) !== true) {
      throw new TypeError("plane");
    }

    if (isCodePoint(test) !== true) {
      return false;
    }

    return (planeOf(test) === plane);
  }

  export function isBmp(test: unknown): boolean {
    if (isCodePoint(test) !== true) {
      return false;
    }
    return inPlane(test, 0);
  }
}
