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
  assertStrictEquals(RuneSequence.fromString("").toString(), "");
  assertStrictEquals(RuneSequence.fromString("0").toString(), "0");
  assertStrictEquals(
    RuneSequence.fromString("\u{10000}").toString(),
    "\u{10000}",
  );
  assertStrictEquals(
    RuneSequence.fromString("\u{10FFFF}").toString(),
    "\u{10FFFF}",
  );

  assertStrictEquals(RuneSequence.fromString("00").toString(), "00");
  assertStrictEquals(
    RuneSequence.fromString("\u{10000}0").toString(),
    "\u{10000}0",
  );
  assertStrictEquals(
    RuneSequence.fromString("\u{10000}\u{10000}").toString(),
    "\u{10000}\u{10000}",
  );

  assertStrictEquals(
    RuneSequence.fromString("\uD800\uDC00").toString(),
    "\uD800\uDC00",
  );

  assertThrows(
    () => {
      RuneSequence.fromString("\uD800");
    },
    TypeError,
    "runeString",
  );
  assertThrows(
    () => {
      RuneSequence.fromString("\uDFFF");
    },
    TypeError,
    "runeString",
  );
  assertThrows(
    () => {
      RuneSequence.fromString("\uDFFF");
    },
    TypeError,
    "runeString",
  );
  assertThrows(
    () => {
      RuneSequence.fromString("\uDC00\uD800");
    },
    TypeError,
    "runeString",
  );
  assertThrows(
    () => {
      RuneSequence.fromString("0\uD8000");
    },
    TypeError,
    "runeString",
  );
});

Deno.test("Rune.fromRunes(Rune[])", () => {
});
