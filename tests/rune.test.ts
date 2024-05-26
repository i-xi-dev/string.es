import { assertStrictEquals, assertThrows } from "./deps.ts";
import { Rune, Unicode } from "../mod.ts";

Deno.test("Rune.isRune(string)", () => {
  assertStrictEquals(Rune.isRune(""), false);
  assertStrictEquals(Rune.isRune("\u0000"), true);
  assertStrictEquals(Rune.isRune("\uFFFF"), true);
  assertStrictEquals(Rune.isRune("a"), true);
  assertStrictEquals(Rune.isRune("あ"), true);
  assertStrictEquals(Rune.isRune("\u{10FFFF}"), true);
  assertStrictEquals(Rune.isRune("\uD800"), false);
  assertStrictEquals(Rune.isRune("\uDC00"), false);
  assertStrictEquals(Rune.isRune("\uD800\uDC00"), true);
  assertStrictEquals(Rune.isRune("\uDC00\uD800"), false);
  assertStrictEquals(Rune.isRune("\uD7FF\uDC00"), false);
  assertStrictEquals(Rune.isRune("aa"), false);
  assertStrictEquals(Rune.isRune("aaa"), false);

  //
  assertStrictEquals(Rune.isRune("🤷🏽‍♀️"), false);
});

Deno.test("Rune.isRune(any)", () => {
  assertStrictEquals(Rune.isRune(undefined), false);
  assertStrictEquals(Rune.isRune(1), false);
});

Deno.test("Rune.fromCodePoint(number)", () => {
  assertStrictEquals(Rune.fromCodePoint(0), "\u0000");
  assertStrictEquals(Rune.fromCodePoint(0x10FFFF), "\u{10FFFF}");

  assertThrows(
    () => {
      Rune.fromCodePoint(-1);
    },
    RangeError,
    "codePoint",
  );
  assertThrows(
    () => {
      Rune.fromCodePoint(0x110000);
    },
    RangeError,
    "codePoint",
  );
});

Deno.test("Rune.fromCodePoint(any)", () => {
  assertThrows(
    () => {
      Rune.fromCodePoint("" as unknown as number);
    },
    RangeError,
    "codePoint",
  );
});

Deno.test("Rune.toCodePoint(string)", () => {
  assertStrictEquals(Rune.toCodePoint("\u0000"), 0);
  assertStrictEquals(Rune.toCodePoint("\u{10FFFF}"), 0x10FFFF);

  assertThrows(
    () => {
      Rune.toCodePoint("\u0000\u0000");
    },
    RangeError,
    "rune",
  );
  assertThrows(
    () => {
      Rune.toCodePoint("");
    },
    RangeError,
    "rune",
  );
});

Deno.test("Rune.toCodePoint(any)", () => {
  assertThrows(
    () => {
      Rune.toCodePoint(0 as unknown as string);
    },
    RangeError,
    "rune",
  );
});

Deno.test("Rune.inGeneralCategory(string, string)", () => {
  assertStrictEquals(Rune.inGeneralCategory("\u0000", "Nd"), false);
  assertStrictEquals(Rune.inGeneralCategory("0", "Nd"), true);

  assertThrows(
    () => {
      Rune.inGeneralCategory("00", "Nd");
    },
    TypeError,
    "test",
  );
  assertThrows(
    () => {
      Rune.inGeneralCategory("0", "x" as Unicode.GeneralCategory);
    },
    RangeError,
    "gc",
  );
});

Deno.test("Rune.inScript(string, string)", () => {
  assertStrictEquals(Rune.inScript("あ", "Hira"), true);
  //TODO assertStrictEquals(Rune.inScript("あ", "Jpan"), true);
  assertStrictEquals(Rune.inScript("ー", "Hira"), true);
  assertStrictEquals(Rune.inScript("あ", "Hira", true), true);
  assertStrictEquals(Rune.inScript("ー", "Hira", true), false);

  assertThrows(
    () => {
      Rune.inScript("00", "Hira");
    },
    TypeError,
    "test",
  );
});
