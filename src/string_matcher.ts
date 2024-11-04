import { codepoint, int, plane } from "./_.ts";
import { IntegerRange } from "../deps.ts";

export class StringMatcher {
  exec(rules: StringMatcher.Rules): StringMatcher.MatchResult {
    throw new Error("TODO");
  }
}

export namespace StringMatcher {
  export type Rules = {
    unit: "char" | "rune" | "grapheme";
    planes: plane[];
    bmp: boolean; // equivalents planes:[0]
    codePointRanges: IntegerRange.Like<codepoint>[];
    scripts: string[];
    generalCategories: string[];
    //TODO pattern
  };

  export type SubstringInfo = {
    index: int;
    value: string;
  };

  export type MatchResult = {
    isMatch: boolean;
    unmatchedUnits?: SubstringInfo[];
  };
}
