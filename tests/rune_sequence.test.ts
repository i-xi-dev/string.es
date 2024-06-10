import { assertStrictEquals, assertThrows } from "./deps.ts";
import { Unicode } from "../mod.ts";
const { RuneSequence } = Unicode;

Deno.test("Rune.prototype.charCount", () => {
  assertStrictEquals(RuneSequence.fromString("").charCount, 0);
  assertStrictEquals(RuneSequence.fromString("0").charCount, 1);
  assertStrictEquals(RuneSequence.fromString("\u{10000}").charCount, 2);
  assertStrictEquals(RuneSequence.fromString("\u{10FFFF}").charCount, 2);

  assertStrictEquals(RuneSequence.fromString("00").charCount, 2);
  assertStrictEquals(RuneSequence.fromString("\u{10000}0").charCount, 3);
  assertStrictEquals(
    RuneSequence.fromString("\u{10000}\u{10000}").charCount,
    4,
  );
});

Deno.test("Rune.prototype.runeCount", () => {
  assertStrictEquals(RuneSequence.fromString("").runeCount, 0);
  assertStrictEquals(RuneSequence.fromString("0").runeCount, 1);
  assertStrictEquals(RuneSequence.fromString("\u{10000}").runeCount, 1);
  assertStrictEquals(RuneSequence.fromString("\u{10FFFF}").runeCount, 1);

  assertStrictEquals(RuneSequence.fromString("00").runeCount, 2);
  assertStrictEquals(RuneSequence.fromString("\u{10000}0").runeCount, 2);
  assertStrictEquals(
    RuneSequence.fromString("\u{10000}\u{10000}").runeCount,
    2,
  );
});

Deno.test("Rune.fromString(string)", () => {
});
