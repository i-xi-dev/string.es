import { CodePoint } from "./code_point.ts";
import { CodePointRange } from "./code_point_range.ts";
import { Plane } from "./plane.ts";
import { RuneString } from "./rune_string.ts";

export namespace Rune {
  export function toCodePoint(
    runeString: RuneString,
    _checked = false,
  ): CodePoint {
    if (_checked !== true) {
      if (RuneString.isRuneString(runeString) !== true) {
        throw new TypeError("runeString");
      }
    }
    return runeString.codePointAt(0) as CodePoint;
  }

  export function planeOf(runeString: RuneString, _checked = false): Plane {
    if (_checked !== true) {
      if (RuneString.isRuneString(runeString) !== true) {
        throw new TypeError("runeString");
      }
    }
    return CodePoint.planeOf(toCodePoint(runeString, true), true);
  }

  export function isBmp(runeString: RuneString, _checked = false): boolean {
    if (_checked !== true) {
      if (RuneString.isRuneString(runeString) !== true) {
        throw new TypeError("runeString");
      }
    }
    return CodePoint.isBmp(toCodePoint(runeString, true), true);
  }

  export function inPlanes(
    runeString: RuneString,
    planes: Array<Plane>,
    _checked = false,
  ): boolean {
    if (_checked !== true) {
      if (RuneString.isRuneString(runeString) !== true) {
        throw new TypeError("runeString");
      }
    }
    return CodePoint.inPlanes(toCodePoint(runeString, true), planes, true);
  }

  export function inCodePointRanges(
    runeString: RuneString,
    ranges: Array<CodePointRange>,
    _checked = false,
  ): boolean {
    if (_checked !== true) {
      if (RuneString.isRuneString(runeString) !== true) {
        throw new TypeError("runeString");
      }
    }
    return CodePoint.inRanges(toCodePoint(runeString, true), ranges, true);
  }
}
