import { CodePoint } from "./code_point.ts";
import { CodePointRange } from "./code_point_range.ts";
import { GeneralCategory } from "./general_category.ts";
import { Plane } from "./plane.ts";
import { RuneString } from "./rune_string.ts";
import { Uint16 } from "../../deps.ts";

export class Rune {
  readonly #codePoint: CodePoint;
  readonly #value: RuneString;

  private constructor(codePoint: CodePoint) {
    this.#codePoint = codePoint;
    this.#value = RuneString.fromCodePoint(codePoint, true);
  }

  get plane(): Plane {
    return CodePoint.planeOf(this.#codePoint, true);
  }

  static fromCodePoint(codePoint: CodePoint): Rune {
    if (CodePoint.isCodePoint(codePoint) !== true) {
      throw new TypeError("codePoint");
    }
    return new Rune(codePoint);
  }

  static fromString(runeString: RuneString): Rune {
    return new Rune(RuneString.toCodePoint(runeString));
  }

  // charCodesは [Uint16] | [Uint16, Uint16]
  static fromCharCodes(charCodes: Iterable<number>): Rune {
    return Rune.fromString(RuneString.fromCharCodes(charCodes));
  }

  toCodePoint(): CodePoint {
    return this.#codePoint;
  }

  toString(): RuneString {
    return this.#value;
  }

  toCharCodes(): [Uint16] | [Uint16, Uint16] {
    const charCode0 = this.#value.charCodeAt(0);
    if (this.#value.length === 1) {
      return [charCode0];
    } else {
      return [charCode0, this.#value.charCodeAt(1)];
    }
  }

  isBmp(): boolean {
    return CodePoint.isBmp(this.#codePoint, true);
  }

  inPlanes(planes: Array<Plane>): boolean {
    return CodePoint.inPlanes(this.#codePoint, planes, true);
  }

  inCodePointRanges(ranges: Array<CodePointRange>): boolean {
    return CodePoint.inRanges(this.#codePoint, ranges, true);
  }

  matchesScripts(
    scripts: Array<string>,
    excludeScriptExtensions = false,
  ): boolean {
    return RuneString.matchesScripts(
      this.#value,
      scripts,
      excludeScriptExtensions,
      true,
    );
  }

  matchesGeneralCategories(
    includeCategories: Array<GeneralCategory>,
  ): boolean {
    return RuneString.matchesGeneralCategories(
      this.#value,
      includeCategories,
      true,
    );
  }
}
