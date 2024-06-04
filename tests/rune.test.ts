import { assertStrictEquals, assertThrows } from "./deps.ts";
import { Unicode } from "../mod.ts";
const { Block, Rune } = Unicode;

Deno.test("Rune.prototype.plane", () => {
  assertStrictEquals(Rune.fromCodePoint(0).plane, 0);
  assertStrictEquals(Rune.fromCodePoint(0xFFFF).plane, 0);
  assertStrictEquals(Rune.fromCodePoint(0x10000).plane, 1);
  assertStrictEquals(Rune.fromCodePoint(0x1FFFF).plane, 1);
  assertStrictEquals(Rune.fromCodePoint(0x20000).plane, 2);
  assertStrictEquals(Rune.fromCodePoint(0x2FFFF).plane, 2);
  assertStrictEquals(Rune.fromCodePoint(0x30000).plane, 3);
  assertStrictEquals(Rune.fromCodePoint(0x3FFFF).plane, 3);
  assertStrictEquals(Rune.fromCodePoint(0x40000).plane, 4);
  assertStrictEquals(Rune.fromCodePoint(0x4FFFF).plane, 4);
  assertStrictEquals(Rune.fromCodePoint(0x50000).plane, 5);
  assertStrictEquals(Rune.fromCodePoint(0x5FFFF).plane, 5);
  assertStrictEquals(Rune.fromCodePoint(0x60000).plane, 6);
  assertStrictEquals(Rune.fromCodePoint(0x6FFFF).plane, 6);
  assertStrictEquals(Rune.fromCodePoint(0x70000).plane, 7);
  assertStrictEquals(Rune.fromCodePoint(0x7FFFF).plane, 7);
  assertStrictEquals(Rune.fromCodePoint(0x80000).plane, 8);
  assertStrictEquals(Rune.fromCodePoint(0x8FFFF).plane, 8);
  assertStrictEquals(Rune.fromCodePoint(0x90000).plane, 9);
  assertStrictEquals(Rune.fromCodePoint(0x9FFFF).plane, 9);
  assertStrictEquals(Rune.fromCodePoint(0xA0000).plane, 10);
  assertStrictEquals(Rune.fromCodePoint(0xAFFFF).plane, 10);
  assertStrictEquals(Rune.fromCodePoint(0xB0000).plane, 11);
  assertStrictEquals(Rune.fromCodePoint(0xBFFFF).plane, 11);
  assertStrictEquals(Rune.fromCodePoint(0xC0000).plane, 12);
  assertStrictEquals(Rune.fromCodePoint(0xCFFFF).plane, 12);
  assertStrictEquals(Rune.fromCodePoint(0xD0000).plane, 13);
  assertStrictEquals(Rune.fromCodePoint(0xDFFFF).plane, 13);
  assertStrictEquals(Rune.fromCodePoint(0xE0000).plane, 14);
  assertStrictEquals(Rune.fromCodePoint(0xEFFFF).plane, 14);
  assertStrictEquals(Rune.fromCodePoint(0xF0000).plane, 15);
  assertStrictEquals(Rune.fromCodePoint(0xFFFFF).plane, 15);
  assertStrictEquals(Rune.fromCodePoint(0x100000).plane, 16);
  assertStrictEquals(Rune.fromCodePoint(0x10FFFF).plane, 16);
});

Deno.test("Rune.fromCodePoint(number), Rune.prototype.toCodePoint()", () => {
  assertStrictEquals(Rune.fromCodePoint(0).toCodePoint(), 0);
  assertStrictEquals(Rune.fromCodePoint(0x10FFFF).toCodePoint(), 0x10FFFF);
  assertStrictEquals(Rune.fromCodePoint(0xD7FF).toCodePoint(), 0xD7FF);
  assertStrictEquals(Rune.fromCodePoint(0xE000).toCodePoint(), 0xE000);

  assertThrows(
    () => {
      Rune.fromCodePoint(-1);
    },
    TypeError,
    "codePoint",
  );

  assertThrows(
    () => {
      Rune.fromCodePoint(0x110000);
    },
    TypeError,
    "codePoint",
  );

  assertThrows(
    () => {
      Rune.fromCodePoint(0xD800);
    },
    RangeError,
    "codePoint",
  );

  assertThrows(
    () => {
      Rune.fromCodePoint(0xDFFF);
    },
    RangeError,
    "codePoint",
  );
});

Deno.test("Rune.fromRuneString(number)", () => {
  assertStrictEquals(Rune.fromRuneString("\u{0}").toCodePoint(), 0);
  assertStrictEquals(Rune.fromRuneString("\u{10FFFF}").toCodePoint(), 0x10FFFF);
  assertStrictEquals(Rune.fromRuneString("\u{D7FF}").toCodePoint(), 0xD7FF);
  assertStrictEquals(Rune.fromRuneString("\u{E000}").toCodePoint(), 0xE000);

  assertThrows(
    () => {
      Rune.fromRuneString("");
    },
    TypeError,
    "runeString",
  );

  assertThrows(
    () => {
      Rune.fromRuneString("00");
    },
    TypeError,
    "runeString",
  );

  assertThrows(
    () => {
      Rune.fromRuneString("\uD800");
    },
    TypeError,
    "runeString",
  );

  assertThrows(
    () => {
      Rune.fromRuneString("\uDFFF");
    },
    TypeError,
    "runeString",
  );
});

//TODO fromCharCodes

Deno.test("Rune.prototype.toRuneString()", () => {
  assertStrictEquals(Rune.fromCodePoint(0).toRuneString(), "\u{0}");
  assertStrictEquals(Rune.fromCodePoint(0x10FFFF).toRuneString(), "\u{10FFFF}");
  assertStrictEquals(Rune.fromCodePoint(0xD7FF).toRuneString(), "\u{D7FF}");
  assertStrictEquals(Rune.fromCodePoint(0xE000).toRuneString(), "\u{E000}");
});

//TODO toCharCodes

Deno.test("Rune.prototype.toString()", () => {
  assertStrictEquals(Rune.fromCodePoint(0).toString(), "\u{0}");
  assertStrictEquals(Rune.fromCodePoint(0x10FFFF).toString(), "\u{10FFFF}");
  assertStrictEquals(Rune.fromCodePoint(0xD7FF).toString(), "\u{D7FF}");
  assertStrictEquals(Rune.fromCodePoint(0xE000).toString(), "\u{E000}");
});

Deno.test("Rune.prototype.isBmp()", () => {
  assertStrictEquals(Rune.fromCodePoint(0).isBmp(), true);
  assertStrictEquals(Rune.fromCodePoint(0xFFFF).isBmp(), true);
  assertStrictEquals(Rune.fromCodePoint(0x10000).isBmp(), false);
  assertStrictEquals(Rune.fromCodePoint(0x10FFFF).isBmp(), false);
});



//inPlanes
//inCodePointRanges
//matchesScripts
//matchesGeneralCategories
