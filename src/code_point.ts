import { inRange } from "../deps.ts";

// 事実上定義できないのでnumberの別名とする
export type CodePoint = number;

export namespace CodePoint {
  export const MIN_VALUE = 0x0;

  export const MAX_VALUE = 0x10FFFF;

  export function isCodePoint(test: unknown): test is CodePoint {
    return Number.isSafeInteger(test) &&
      inRange(test as number, [MIN_VALUE, MAX_VALUE]);
  }
}
