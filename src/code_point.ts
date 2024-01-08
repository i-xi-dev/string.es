import { NumberEx } from "../deps.ts";

// 事実上定義できないのでnumberの別名とする
export type CodePoint = number;

export namespace CodePoint {
  export const MIN_VALUE = 0x0;

  export const MAX_VALUE = 0x10FFFF;

  export const MIN_HIGH_SURROGATE = 0xD800;

  export const MAX_HIGH_SURROGATE = 0xDBFF;

  export const MIN_LOW_SURROGATE = 0xDC00;

  export const MAX_LOW_SURROGATE = 0xDFFF;

  export function isCodePoint(test: unknown): test is CodePoint {
    return Number.isSafeInteger(test) &&
      NumberEx.inRange(test as number, [MIN_VALUE, MAX_VALUE]);
  }

  export function toString(source: CodePoint): string {
    if (isCodePoint(CodePoint)) {
      return `U+${source.toString(16).toUpperCase().padStart(4, "0")}`;
    }
    throw new RangeError("source");
  }

  export function isHighSurrogateCodePoint(test: unknown): boolean {
    if (isCodePoint(test) !== true) {
      return false;
    }
    return NumberEx.inRange(test as number, [
      MIN_HIGH_SURROGATE,
      MAX_HIGH_SURROGATE,
    ]);
  }

  export function isLowSurrogateCodePoint(test: unknown): boolean {
    if (isCodePoint(test) !== true) {
      return false;
    }
    return NumberEx.inRange(test as number, [
      MIN_LOW_SURROGATE,
      MAX_LOW_SURROGATE,
    ]);
  }

  export function isSurrogateCodePoint(test: unknown): boolean {
    if (isCodePoint(test) !== true) {
      return false;
    }
    return NumberEx.inRange(test as number, [
      MIN_HIGH_SURROGATE,
      MAX_LOW_SURROGATE,
    ]);
  }
}
