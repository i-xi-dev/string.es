import { CodePoint } from "./code_point.ts";
import { CodePointRange } from "./code_point_range.ts";
import { EMPTY, isString } from "../string.ts";
import { GeneralCategory } from "./general_category.ts";
import { Plane } from "./plane.ts";

// scriptは、UnicodeのScript（≒ISO 15924のScript、Intl.Localeのscript）
function _isScript(test: unknown): boolean {
  return isString(test) && /^[A-Z][a-z]{3}$/.test(test);
}

function _matchesScripts(
  runeString: RuneString,
  scripts: Array<string>,
  excludeScriptExtensions: boolean,
): boolean {
  let ps: Array<string>;
  if (excludeScriptExtensions === true) {
    ps = scripts.map((script) => `\\p{sc=${script}}`);
  } else {
    ps = scripts.map((script) => `\\p{scx=${script}}`);
  }
  return (new RegExp(`^[${ps.join("|")}]$`, "u")).test(runeString);
}

function _matchesGeneralCategories(
  runeString: RuneString,
  generalCategories: Array<GeneralCategory>,
  exclude: boolean,
): boolean {
  const ps = generalCategories.map((category) => `\\p{gc=${category}}`);
  return (new RegExp(`^[${exclude ? "^" : EMPTY}${ps.join("|")}]$`, "u")).test(
    runeString,
  );
}

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

  export function toCodePoint(
    runeString: RuneString,
    _checked = false,
  ): CodePoint {
    if (_checked !== true) {
      if (isRuneString(runeString) !== true) {
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
    return CodePoint.planeOf(RuneString.toCodePoint(runeString, true), true);
  }

  export function isBmp(runeString: RuneString, _checked = false): boolean {
    if (_checked !== true) {
      if (RuneString.isRuneString(runeString) !== true) {
        throw new TypeError("runeString");
      }
    }
    return CodePoint.isBmp(RuneString.toCodePoint(runeString, true), true);
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
    return CodePoint.inPlanes(
      RuneString.toCodePoint(runeString, true),
      planes,
      true,
    );
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
    return CodePoint.inRanges(
      RuneString.toCodePoint(runeString, true),
      ranges,
      true,
    );
  }

  export function matchesScripts(
    runeString: RuneString,
    scripts: Array<string>,
    excludeScriptExtensions = false,
    _checked = false,
  ): boolean {
    if (_checked !== true) {
      if (RuneString.isRuneString(runeString) !== true) {
        throw new TypeError("runeString");
      }
    }

    if (Array.isArray(scripts)) {
      if (scripts.every((script) => _isScript(script)) !== true) {
        throw new TypeError("scripts[*]");
      }
      return _matchesScripts(
        runeString,
        scripts,
        excludeScriptExtensions,
      );
    } else {
      throw new TypeError("scripts");
    }
  }

  export function matchesGeneralCategories(
    runeString: RuneString,
    generalCategories: Array<GeneralCategory>,
    _checked = false,
  ): boolean {
    if (_checked !== true) {
      if (RuneString.isRuneString(runeString) !== true) {
        throw new TypeError("runeString");
      }
    }

    if (Array.isArray(generalCategories)) {
      if (
        generalCategories.every((category) =>
          Object.values(GeneralCategory).includes(category)
        ) !== true
      ) {
        throw new TypeError("generalCategories[*]");
      }
      return _matchesGeneralCategories(runeString, generalCategories, false);
    } else {
      throw new TypeError("generalCategories");
    }
  }
}
