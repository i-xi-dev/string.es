import { SafeInteger } from "../deps.ts";
import { Type } from "../deps.ts";

type int = number;
type codepoint = number;
type char = string;
type rune = string;
type grapheme = string;

/**
 * The zero-length string.
 */
export const EMPTY = "";

export function isNonEmpty(test: unknown): boolean {
  return Type.isString(test) && (test.length > 0);
}

export function* toChars(source: string): Generator<char, void, void> {
  Type.assertString(source, "source");

  for (let i = 0; i < source.length; i++) {
    yield source.charAt(i);
  }
}

export function charCountOf(source: string): int {
  Type.assertString(source, "source");
  return source.length;
}

export function* toRunes(source: string): Generator<rune, void, void> {
  Type.assertString(source, "source");

  for (const rune of [...source]) {
    yield rune;
  }
}

export function runeCountOf(source: string): int {
  Type.assertString(source, "source");
  return [...source].length;
}

export function* toCodePoints(
  source: string,
): Generator<codepoint, void, void> {
  Type.assertString(source, "source");

  for (const rune of [...source]) {
    yield rune.codePointAt(0)!;
  }
}

export function* toGraphemes(source: string): Generator<grapheme, void, void> {
  Type.assertString(source, "source");
}

export function matches(input: string, pattern: string): boolean {
  Type.assertString(input, "input");
  Type.assertString(pattern, "pattern");

  if (pattern.length <= 0) {
    return false;
  }
  return (new RegExp(`^${pattern}$`, "u")).test(input);
}

export function contains(input: string, pattern: string): boolean {
  Type.assertString(input, "input");
  Type.assertString(pattern, "pattern");

  if (pattern.length <= 0) {
    return false;
  }
  return (new RegExp(`${pattern}`, "u")).test(input);
}

export function startsWith(input: string, pattern: string): boolean {
  Type.assertString(input, "input");
  Type.assertString(pattern, "pattern");

  if (pattern.length <= 0) {
    return false;
  }
  return (new RegExp(`^${pattern}`, "u")).test(input);
}

export function endsWith(input: string, pattern: string): boolean {
  Type.assertString(input, "input");
  Type.assertString(pattern, "pattern");

  if (pattern.length <= 0) {
    return false;
  }
  return (new RegExp(`${pattern}$`, "u")).test(input);
}

export function collectStart(input: string, pattern: string): string {
  Type.assertString(input, "input");

  if (isNonEmpty(pattern) !== true) {
    return EMPTY;
  }
  const results = (new RegExp(`^${pattern}`, "u")).exec(input);
  if (results === null) {
    return EMPTY;
  }
  return results[0] as string;
}

export function trim(input: string, pattern: string): string {
  Type.assertString(input, "input");

  if (isNonEmpty(pattern) !== true) {
    return input;
  }
  return input.replace(
    new RegExp(`(?:^${pattern}|${pattern}$)`, "gu"),
    EMPTY,
  );
}

export function trimStart(input: string, pattern: string): string {
  Type.assertString(input, "input");

  if (isNonEmpty(pattern) !== true) {
    return input;
  }
  return input.replace(new RegExp(`^${pattern}`, "u"), EMPTY);
}

export function trimEnd(input: string, pattern: string): string {
  Type.assertString(input, "input");

  if (isNonEmpty(pattern) !== true) {
    return input;
  }
  return input.replace(new RegExp(`${pattern}$`, "u"), EMPTY);
}

export function* segmentedChars(
  input: string,
  charCount: int,
  paddingChar?: char,
): Generator<string, void, void> {
  Type.assertString(input, "input");

  if (SafeInteger.isPositive(charCount) !== true) {
    throw new TypeError("charCount");
  }
  if ((Type.isString(paddingChar) !== true) && (paddingChar !== undefined)) {
    throw new TypeError("paddingChar");
  }
  if (Type.isString(paddingChar) && (paddingChar.length !== 1)) {
    throw new TypeError("paddingChar must be a code unit");
  }

  for (let i = 0; i < input.length; i = i + charCount) {
    const s = input.substring(i, i + charCount);
    yield ((s.length === charCount) || (Type.isString(paddingChar) !== true))
      ? s
      : s.padEnd(charCount, paddingChar);
  }
}
