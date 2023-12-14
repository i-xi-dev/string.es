import { SafeInteger } from "../deps.ts";
import { isString } from "./string.ts";

type rune = string;
type runesequence = string;

namespace Rune {
  export function isRune(test: unknown): boolean {
    if (isString(test) !== true) {
      return false;
    }
    if ((test as string).length > 2) {
      return false;
    }
    return ([...(test as string)].length === 1);
  }

  export function* segment(
    input: runesequence,
    runeCount: SafeInteger,
    paddingRune?: rune,
  ): Generator<string, void, void> {
    if (isString(input) !== true) {
      throw new TypeError("input");
    }
    if (SafeInteger.isPositive(runeCount) !== true) {
      throw new TypeError("runeCount");
    }
    const paddingIsString = isString(paddingRune);
    if (paddingIsString === true) {
      if (isRune(paddingRune) !== true) {
        throw new TypeError("paddingRune");
      }
    }

    const runes = [...input];
    for (let i = 0; i < runes.length; i = i + runeCount) {
      const s = runes.slice(i, i + runeCount);
      const d = runeCount - s.length;

      let r = s.join("");
      if ((d > 0) && (paddingIsString === true)) {
        r = r + (paddingRune as string).repeat(d);
      }
      yield r;
    }
  }
}

export { Rune };
