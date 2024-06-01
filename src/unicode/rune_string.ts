import { CodePoint } from "./code_point.ts";
import { isString } from "../string.ts";

// 事実上定義できないのでstringの別名とする
export type RuneString = string;

export namespace RuneString {
  export function isRuneString(test: unknown): test is RuneString {
    if (isString(test) !== true) {
      return false;
    }

    if (test.length > 2) {
      return false;
    }

    //XXX 以降は、将来的には右記で良い const t = [...test];t.length===1&&t[0].isWellFormed()
    const runeStrings = [...test];
    if (runeStrings.length !== 1) {
      return false;
    }
    if (
      (test.length === 1) &&
      CodePoint.isSurrogate(runeStrings[0].codePointAt(0) as CodePoint, true)
    ) {
      return false;
    }
    return true;
  }
}
