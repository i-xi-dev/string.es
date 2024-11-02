import { SafeIntegerType, StringType } from "../deps.ts";

/** Integer. */
type int = number;

/** 0x0-0x10FFFF */
type codepoint = number;

/**
 * String matching regular expression `/^[\u0000-\uFFFF]{1}$/`.
 * including surrogates.
 */
type char = string;

/**
 * String matching regular expression `/^[\u{0}-\u{10FFFF}]{1}$/u`.
 * excluding any lone surrogates.
 */
type rune = string;

/** A grapheme cluster. */
type grapheme = string;

/**
 * The zero-length string.
 */
export const EMPTY = "";

export function* toChars(source: string): Generator<char, void, void> {
  StringType.assertString(source, "source");

  for (let i = 0; i < source.length; i++) {
    yield source.charAt(i);
  }
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

//XXX オプションでallowMalformed
export function* toRunes(source: string): Generator<rune, void, void> {
  _assertUsvString(source, "source");
  for (const rune of [...source]) {
    yield rune;
  }
}

//XXX オプションでallowMalformed
export function runeCountOf(source: string): int {
  _assertUsvString(source, "source");
  return [...source].length;
}

//XXX オプションでallowMalformed
export function* toCodePoints(
  source: string,
): Generator<codepoint, void, void> {
  _assertUsvString(source, "source");
  for (const rune of [...source]) {
    yield rune.codePointAt(0)!;
  }
}

// export function* toGraphemes(source: string): Generator<grapheme, void, void> {
//   StringType.assertString(source, "source");
//   //TODO
// }

export function matches(input: string, pattern: string): boolean {
  StringType.assertString(input, "input");
  StringType.assertString(pattern, "pattern");

  if (pattern.length <= 0) {
    return false;
  }
  return (new RegExp(`^${pattern}$`, "u")).test(input);
}

export function contains(input: string, pattern: string): boolean {
  StringType.assertString(input, "input");
  StringType.assertString(pattern, "pattern");

  if (pattern.length <= 0) {
    return false;
  }
  return (new RegExp(`${pattern}`, "u")).test(input);
}

export function startsWith(input: string, pattern: string): boolean {
  StringType.assertString(input, "input");
  StringType.assertString(pattern, "pattern");

  if (pattern.length <= 0) {
    return false;
  }
  return (new RegExp(`^${pattern}`, "u")).test(input);
}

export function endsWith(input: string, pattern: string): boolean {
  StringType.assertString(input, "input");
  StringType.assertString(pattern, "pattern");

  if (pattern.length <= 0) {
    return false;
  }
  return (new RegExp(`${pattern}$`, "u")).test(input);
}

export function collectStart(input: string, pattern: string): string {
  StringType.assertString(input, "input");

  if (StringType.isNonEmpty(pattern) !== true) {
    return EMPTY;
  }
  const results = (new RegExp(`^${pattern}`, "u")).exec(input);
  if (results === null) {
    return EMPTY;
  }
  return results[0] as string;
}

export function trim(input: string, pattern: string): string {
  StringType.assertString(input, "input");

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

  if (StringType.isNonEmpty(pattern) !== true) {
    return input;
  }
  return input.replace(new RegExp(`^${pattern}`, "u"), EMPTY);
}

export function trimEnd(input: string, pattern: string): string {
  StringType.assertString(input, "input");

  if (StringType.isNonEmpty(pattern) !== true) {
    return input;
  }
  return input.replace(new RegExp(`${pattern}$`, "u"), EMPTY);
}

export function* segmentedChars(
  input: string,
  charCount: int,
  paddingChar?: char,
): Generator<string, void, void> {
  StringType.assertString(input, "input");

  if (SafeIntegerType.isPositive(charCount) !== true) {
    throw new TypeError("charCount");
  }
  if (
    (StringType.isString(paddingChar) !== true) && (paddingChar !== undefined)
  ) {
    throw new TypeError("paddingChar");
  }
  if (StringType.isString(paddingChar) && (paddingChar.length !== 1)) {
    throw new TypeError("paddingChar must be a code unit");
  }

  for (let i = 0; i < input.length; i = i + charCount) {
    const s = input.substring(i, i + charCount);
    yield ((s.length === charCount) ||
        (StringType.isString(paddingChar) !== true))
      ? s
      : s.padEnd(charCount, paddingChar);
  }
}
