import { CodePoint } from "./code_point.ts";
import { GeneralCategory } from "./general_category.ts";
import { isString } from "./string.ts";

// 事実上定義できないのでstringの別名とする
export type Rune = string;

function _isSurroageChar(test: string): boolean {
  return /^[\uD800-\uDFFF]$/.test(test);
}

export namespace Rune {
  export function isRune(test: unknown): test is Rune {
    if (isString(test) !== true) {
      return false;
    }
    if ((test as string).length > 2) {
      return false;
    }
    //XXX 以降は、将来的には右記で良い const t = [...test];t.length===1&&t[0].isWellFormed()
    const runes = [...(test as string)];
    if (runes.length !== 1) {
      return false;
    }
    if (CodePoint.isSurrogate(runes[0].codePointAt(0))) {
      return false;
    }
    return true;
  }

  export function fromCodePoint(codePoint: CodePoint): Rune {
    if (CodePoint.isCodePoint(codePoint)) {
      if (CodePoint.isSurrogate(codePoint) !== true) {
        return String.fromCodePoint(codePoint);
      }
    }
    throw new RangeError("codePoint");
  }

  export function toCodePoint(rune: Rune): CodePoint {
    if (isRune(rune)) {
      return rune.codePointAt(0) as CodePoint;
    }
    throw new RangeError("rune");
  }

  export function inGeneralCategory(test: Rune, gc: GeneralCategory): boolean {
    if (Object.values(GeneralCategory).includes(gc)) {
      if (isRune(test)) {
        return (new RegExp(`^\\p{gc=${gc}}$`, "u")).test(test);
      }
      throw new TypeError("test");
    }
    throw new RangeError("gc");
  }

  // scriptは、UnicodeのScript（≒ISO 15924のScript、Intl.Localeのscript）
  export function inScript(
    test: Rune,
    script: string,
    excludeExtensions = false,
  ): boolean {
    if (isString(script) && /^[A-Z][a-z]{3}$/.test(script)) {
      if (isRune(test)) {
        let pattern: string;
        if (excludeExtensions === true) {
          pattern = `^\\p{sc=${script}}$`;
        } else {
          pattern = `^[\\p{sc=${script}}|\\p{scx=${script}}]$`;
        }
        return (new RegExp(pattern, "u")).test(test);
      }
      throw new TypeError("test");
    }
    throw new RangeError("script");
  }
}
