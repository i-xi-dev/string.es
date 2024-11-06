import * as CodePoint from "./code_point.ts";
import { char, codepoint, grapheme, int, rune } from "./_.ts";
import { ObjectType, StringType } from "../deps.ts";

/**
 * The zero-length string.
 */
export const EMPTY = "";

export function toChars(source: string): IterableIterator<char, void, void> {
  StringType.assertString(source, "source");

  return (function* (s) {
    for (let i = 0; i < s.length; i++) {
      yield source.charAt(i);
    }
  })(source);
}

export function charCountOf(source: string): int {
  StringType.assertString(source, "source");
  return source.length;
}

function _assertUsvString(test: unknown, label: string): void {
  if ((StringType.isString(test) && test.isWellFormed()) !== true) {
    throw new TypeError(`\`${label}\` must be an USVString.`);
  }
}

export type AllowMalformedOptions = {
  allowMalformed?: boolean;
};

export function toRunes(
  source: string,
  options?: AllowMalformedOptions,
): IterableIterator<rune, void, void> {
  if (options?.allowMalformed === true) {
    StringType.assertString(source, "source");
  } else {
    _assertUsvString(source, "source");
  }

  return (function* (s) {
    for (const rune of [...s]) {
      yield rune;
    }
  })(source);
}

export function runeCountOf(
  source: string,
  options?: AllowMalformedOptions,
): int {
  if (options?.allowMalformed === true) {
    StringType.assertString(source, "source");
  } else {
    _assertUsvString(source, "source");
  }

  return [...source].length;
}

export function fromCodePoints(
  source: Iterable<codepoint>,
  options?: AllowMalformedOptions,
): string {
  ObjectType.assertIterable(source, "source");

  let runes = EMPTY;
  let rune: rune;
  for (const codePoint of source) {
    CodePoint.assertCodePoint(codePoint, "codePoint");
    rune = String.fromCodePoint(codePoint);
    if ((options?.allowMalformed !== true) && (rune.isWellFormed() !== true)) {
      throw new RangeError(
        "`source` must not contain lone surrogate code points.",
      );
    }
    runes += rune;
  }
  return runes;
}

//XXX fromCodePointsAsync(source: AsyncIterable<codepoint>, options?: AllowMalformedOptions): Promise<string>

export function toCodePoints(
  source: string,
  options?: AllowMalformedOptions,
): IterableIterator<codepoint, void, void> {
  if (options?.allowMalformed === true) {
    StringType.assertString(source, "source");
  } else {
    _assertUsvString(source, "source");
  }

  return (function* (s) {
    for (const rune of [...s]) {
      yield rune.codePointAt(0)!;
    }
  })(source);
}

//XXX fromCharCodes(source: Iterable<uint16 | [uint16] | [uint16, uint16]>): string
//XXX toCharCodes(source: string): IterableIterator<[uint16] | [uint16, uint16]>

let _lastSegmenter: WeakRef<Intl.Segmenter>;

function _getGraphemeSegmenter(locale: string | Intl.Locale): Intl.Segmenter {
  const localeName = (locale instanceof Intl.Locale) ? locale.baseName : locale;

  const prev = _lastSegmenter?.deref();
  if (prev && (prev.resolvedOptions().locale === localeName)) {
    return prev;
  }

  const segmenter = new Intl.Segmenter(localeName, { granularity: "grapheme" });
  const resolvedLocale = segmenter.resolvedOptions().locale;

  if (localeName !== resolvedLocale) {
    //XXX 上位の構成要素がマッチしてればokにする？
    throw new RangeError("`locale` is an unsupported locale at runtime.");
  } //XXX 再現条件未調査:Intlのパーサが"jp"をregion扱いしないバグがある？ので日本語関係はエラーになる確率が高い

  _lastSegmenter = new WeakRef(segmenter);

  return segmenter;
}

// 分割はIntl.Segmenterに依存する（実行環境によって結果が異なる可能性は排除できない）
//XXX オプションでallowMalformed
export function toGraphemes(
  source: string,
  locale: string | Intl.Locale = "en",
): IterableIterator<grapheme, void, void> {
  _assertUsvString(source, "source");

  const segmenter = _getGraphemeSegmenter(locale);

  return (function* (seg, s) {
    const segements = seg.segment(s);
    for (const segment of segements) {
      yield segment.segment;
    }
  })(segmenter, source);
}

export function matches(test: string, pattern: string): test is string {
  return StringType.isString(test) && StringType.isString(pattern) &&
    (new RegExp(`^${pattern}$`, "u")).test(test);
}

export function contains(test: string, pattern: string): test is string {
  return StringType.isString(test) && StringType.isString(pattern) &&
    (new RegExp(`${pattern}`, "u")).test(test);
}

export function startsWith(test: string, pattern: string): test is string {
  return StringType.isString(test) && StringType.isString(pattern) &&
    (new RegExp(`^${pattern}`, "u")).test(test);
}

export function endsWith(test: string, pattern: string): test is string {
  return StringType.isString(test) && StringType.isString(pattern) &&
    (new RegExp(`${pattern}$`, "u")).test(test);
}

export function collectStart(input: string, pattern: string): string {
  StringType.assertString(input, "input");
  StringType.assertString(pattern, "pattern");

  const results = (new RegExp(`^${pattern}`, "u")).exec(input);
  if (results === null) {
    return EMPTY;
  }
  return results[0] as string;
}

export function trim(input: string, pattern: string): string {
  StringType.assertString(input, "input");
  StringType.assertString(pattern, "pattern");

  if (StringType.isNonEmpty(pattern) !== true) {
    return input;
  }
  return input.replace(
    new RegExp(`(?:^${pattern}|${pattern}$)`, "gu"),
    EMPTY,
  );
}

export function trimStart(input: string, pattern: string): string {
  StringType.assertString(input, "input");
  StringType.assertString(pattern, "pattern");

  if (StringType.isNonEmpty(pattern) !== true) {
    return input;
  }
  return input.replace(new RegExp(`^${pattern}`, "u"), EMPTY);
}

export function trimEnd(input: string, pattern: string): string {
  StringType.assertString(input, "input");
  StringType.assertString(pattern, "pattern");

  if (StringType.isNonEmpty(pattern) !== true) {
    return input;
  }
  return input.replace(new RegExp(`${pattern}$`, "u"), EMPTY);
}

// toCharsがあればいらんでしょう
// export function* segmentedChars(
//   input: string,
//   charCount: int,
//   paddingChar?: char,
// ): Generator<string, void, void> {
//   StringType.assertString(input, "input");

//   if (SafeIntegerType.isPositive(charCount) !== true) {
//     throw new TypeError("charCount");
//   }
//   if (
//     (StringType.isString(paddingChar) !== true) && (paddingChar !== undefined)
//   ) {
//     throw new TypeError("paddingChar");
//   }
//   if (StringType.isString(paddingChar) && (paddingChar.length !== 1)) {
//     throw new TypeError("paddingChar must be a code unit");
//   }

//   for (let i = 0; i < input.length; i = i + charCount) {
//     const s = input.substring(i, i + charCount);
//     yield ((s.length === charCount) ||
//         (StringType.isString(paddingChar) !== true))
//       ? s
//       : s.padEnd(charCount, paddingChar);
//   }
// }
