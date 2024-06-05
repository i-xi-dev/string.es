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

Deno.test("Rune.fromString(number)", () => {
  assertStrictEquals(Rune.fromString("\u{0}").toCodePoint(), 0);
  assertStrictEquals(Rune.fromString("\u{10FFFF}").toCodePoint(), 0x10FFFF);
  assertStrictEquals(Rune.fromString("\u{D7FF}").toCodePoint(), 0xD7FF);
  assertStrictEquals(Rune.fromString("\u{E000}").toCodePoint(), 0xE000);

  assertThrows(
    () => {
      Rune.fromString("");
    },
    TypeError,
    "runeString",
  );

  assertThrows(
    () => {
      Rune.fromString("00");
    },
    TypeError,
    "runeString",
  );

  assertThrows(
    () => {
      Rune.fromString("\uD800");
    },
    TypeError,
    "runeString",
  );

  assertThrows(
    () => {
      Rune.fromString("\uDFFF");
    },
    TypeError,
    "runeString",
  );
});

//TODO fromCharCodes

Deno.test("Rune.prototype.toString()", () => {
  assertStrictEquals(Rune.fromCodePoint(0).toString(), "\u{0}");
  assertStrictEquals(Rune.fromCodePoint(0x10FFFF).toString(), "\u{10FFFF}");
  assertStrictEquals(Rune.fromCodePoint(0xD7FF).toString(), "\u{D7FF}");
  assertStrictEquals(Rune.fromCodePoint(0xE000).toString(), "\u{E000}");
});

//TODO toCharCodes

Deno.test("Rune.prototype.isBmp()", () => {
  assertStrictEquals(Rune.fromCodePoint(0).isBmp(), true);
  assertStrictEquals(Rune.fromCodePoint(0xFFFF).isBmp(), true);
  assertStrictEquals(Rune.fromCodePoint(0x10000).isBmp(), false);
  assertStrictEquals(Rune.fromCodePoint(0x10FFFF).isBmp(), false);
});

Deno.test("Rune.prototype.inPlanes(number[])", () => {
  assertStrictEquals(Rune.fromCodePoint(0).inPlanes([]), false);

  assertStrictEquals(Rune.fromCodePoint(0).inPlanes([0]), true);
  assertStrictEquals(Rune.fromCodePoint(0xFFFF).inPlanes([0]), true);
  assertStrictEquals(Rune.fromCodePoint(0).inPlanes([1]), false);
  assertStrictEquals(Rune.fromCodePoint(0x100000).inPlanes([16]), true);
  assertStrictEquals(Rune.fromCodePoint(0x10FFFF).inPlanes([16]), true);

  assertStrictEquals(Rune.fromCodePoint(0).inPlanes([0, 16]), true);
  assertStrictEquals(Rune.fromCodePoint(0xFFFF).inPlanes([0, 16]), true);
  assertStrictEquals(Rune.fromCodePoint(0).inPlanes([1, 16]), false);
  assertStrictEquals(Rune.fromCodePoint(0x100000).inPlanes([0, 16]), true);
  assertStrictEquals(Rune.fromCodePoint(0x10FFFF).inPlanes([0, 16]), true);

  assertThrows(
    () => {
      Rune.fromCodePoint(0).inPlanes(undefined as unknown as []);
    },
    TypeError,
    "planes",
  );

  assertThrows(
    () => {
      Rune.fromCodePoint(0).inPlanes("0" as unknown as []);
    },
    TypeError,
    "planes",
  );

  assertThrows(
    () => {
      Rune.fromCodePoint(0).inPlanes([-1] as unknown as []);
    },
    TypeError,
    "planes[*]",
  );

  assertThrows(
    () => {
      Rune.fromCodePoint(0).inPlanes([17] as unknown as []);
    },
    TypeError,
    "planes[*]",
  );
});

Deno.test("Rune.prototype.inCodePointRanges(number[])", () => {
  const blocks0: Array<[number] | [number, number]> = [];

  assertStrictEquals(Rune.fromCodePoint(0).inCodePointRanges(blocks0), false);
  assertStrictEquals(
    Rune.fromCodePoint(0x7F).inCodePointRanges(blocks0),
    false,
  );
  assertStrictEquals(
    Rune.fromCodePoint(0x80).inCodePointRanges(blocks0),
    false,
  );
  assertStrictEquals(
    Rune.fromCodePoint(0xFF).inCodePointRanges(blocks0),
    false,
  );
  assertStrictEquals(
    Rune.fromCodePoint(0x100).inCodePointRanges(blocks0),
    false,
  );

  const blocks1 = [
    Block.C0_CONTROLS_AND_BASIC_LATIN,
    Block.C1_CONTROLS_AND_LATIN_1_SUPPLEMENT,
  ];

  assertStrictEquals(Rune.fromCodePoint(0).inCodePointRanges(blocks1), true);
  assertStrictEquals(Rune.fromCodePoint(0x7F).inCodePointRanges(blocks1), true);
  assertStrictEquals(Rune.fromCodePoint(0x80).inCodePointRanges(blocks1), true);
  assertStrictEquals(Rune.fromCodePoint(0xFF).inCodePointRanges(blocks1), true);
  assertStrictEquals(
    Rune.fromCodePoint(0x100).inCodePointRanges(blocks1),
    false,
  );

  const blocks2 = [
    Block.C1_CONTROLS_AND_LATIN_1_SUPPLEMENT,
    Block.C0_CONTROLS_AND_BASIC_LATIN,
  ];

  assertStrictEquals(Rune.fromCodePoint(0).inCodePointRanges(blocks2), true);
  assertStrictEquals(Rune.fromCodePoint(0x7F).inCodePointRanges(blocks2), true);
  assertStrictEquals(Rune.fromCodePoint(0x80).inCodePointRanges(blocks2), true);
  assertStrictEquals(Rune.fromCodePoint(0xFF).inCodePointRanges(blocks2), true);
  assertStrictEquals(
    Rune.fromCodePoint(0x100).inCodePointRanges(blocks2),
    false,
  );

  assertThrows(
    () => {
      Rune.fromCodePoint(0).inCodePointRanges(undefined as unknown as []);
    },
    TypeError,
    "ranges",
  );

  assertThrows(
    () => {
      Rune.fromCodePoint(0).inCodePointRanges(0 as unknown as []);
    },
    TypeError,
    "ranges",
  );

  assertThrows(
    () => {
      Rune.fromCodePoint(0).inCodePointRanges([0 as unknown as [0]]);
    },
    TypeError,
    "ranges[*]",
  );

  assertThrows(
    () => {
      Rune.fromCodePoint(0).inCodePointRanges([
        Block.C0_CONTROLS_AND_BASIC_LATIN,
        0 as unknown as [0],
      ]);
    },
    TypeError,
    "ranges[*]",
  );

  assertThrows(
    () => {
      Rune.fromCodePoint(0).inCodePointRanges([
        0 as unknown as [0],
        Block.C0_CONTROLS_AND_BASIC_LATIN,
      ]);
    },
    TypeError,
    "ranges[*]",
  );
});

Deno.test("Rune.prototype.matchesScripts(string[], boolean?)", () => {
  const scripts0 = ["Hira"];

  assertStrictEquals(Rune.fromString("あ").matchesScripts(scripts0), true);
  assertStrictEquals(
    Rune.fromString("あ").matchesScripts(scripts0, false),
    true,
  );
  assertStrictEquals(
    Rune.fromString("あ").matchesScripts(scripts0, true),
    true,
  );
  assertStrictEquals(Rune.fromString("ア").matchesScripts(scripts0), false);
  assertStrictEquals(
    Rune.fromString("ア").matchesScripts(scripts0, false),
    false,
  );
  assertStrictEquals(
    Rune.fromString("ア").matchesScripts(scripts0, true),
    false,
  );
  assertStrictEquals(Rune.fromString("ー").matchesScripts(scripts0), true);
  assertStrictEquals(
    Rune.fromString("ー").matchesScripts(scripts0, false),
    true,
  );
  assertStrictEquals(
    Rune.fromString("ー").matchesScripts(scripts0, true),
    false,
  );
  assertStrictEquals(Rune.fromString("1").matchesScripts(scripts0), false);
  assertStrictEquals(
    Rune.fromString("1").matchesScripts(scripts0, false),
    false,
  );
  assertStrictEquals(
    Rune.fromString("1").matchesScripts(scripts0, true),
    false,
  );

  const scripts1 = ["Hira", "Kana"];

  assertStrictEquals(Rune.fromString("あ").matchesScripts(scripts1), true);
  assertStrictEquals(
    Rune.fromString("あ").matchesScripts(scripts1, false),
    true,
  );
  assertStrictEquals(
    Rune.fromString("あ").matchesScripts(scripts1, true),
    true,
  );
  assertStrictEquals(Rune.fromString("ア").matchesScripts(scripts1), true);
  assertStrictEquals(
    Rune.fromString("ア").matchesScripts(scripts1, false),
    true,
  );
  assertStrictEquals(
    Rune.fromString("ア").matchesScripts(scripts1, true),
    true,
  );
  assertStrictEquals(Rune.fromString("ー").matchesScripts(scripts1), true);
  assertStrictEquals(
    Rune.fromString("ー").matchesScripts(scripts1, false),
    true,
  );
  assertStrictEquals(
    Rune.fromString("ー").matchesScripts(scripts1, true),
    false,
  );
  assertStrictEquals(Rune.fromString("1").matchesScripts(scripts1), false);
  assertStrictEquals(
    Rune.fromString("1").matchesScripts(scripts1, false),
    false,
  );
  assertStrictEquals(
    Rune.fromString("1").matchesScripts(scripts1, true),
    false,
  );

  const scripts2: string[] = [];

  assertStrictEquals(Rune.fromString("あ").matchesScripts(scripts2), false);
  assertStrictEquals(
    Rune.fromString("あ").matchesScripts(scripts2, false),
    false,
  );
  assertStrictEquals(
    Rune.fromString("あ").matchesScripts(scripts2, true),
    false,
  );
  assertStrictEquals(Rune.fromString("ア").matchesScripts(scripts2), false);
  assertStrictEquals(
    Rune.fromString("ア").matchesScripts(scripts2, false),
    false,
  );
  assertStrictEquals(
    Rune.fromString("ア").matchesScripts(scripts2, true),
    false,
  );
  assertStrictEquals(Rune.fromString("ー").matchesScripts(scripts2), false);
  assertStrictEquals(
    Rune.fromString("ー").matchesScripts(scripts2, false),
    false,
  );
  assertStrictEquals(
    Rune.fromString("ー").matchesScripts(scripts2, true),
    false,
  );
  assertStrictEquals(Rune.fromString("1").matchesScripts(scripts2), false);
  assertStrictEquals(
    Rune.fromString("1").matchesScripts(scripts2, false),
    false,
  );
  assertStrictEquals(
    Rune.fromString("1").matchesScripts(scripts2, true),
    false,
  );

  assertThrows(
    () => {
      Rune.fromString("1").matchesScripts(null as unknown as []);
    },
    TypeError,
    "scripts",
  );

  assertThrows(
    () => {
      Rune.fromString("1").matchesScripts(["HIRA"]);
    },
    TypeError,
    "scripts[*]",
  );
  assertThrows(
    () => {
      Rune.fromString("1").matchesScripts(["hira"]);
    },
    TypeError,
    "scripts[*]",
  );
  assertThrows(
    () => {
      Rune.fromString("1").matchesScripts(["Latn", "HIRA"]);
    },
    TypeError,
    "scripts[*]",
  );
  assertThrows(
    () => {
      Rune.fromString("1").matchesScripts(["HIRA", "Latn"]);
    },
    TypeError,
    "scripts[*]",
  );
});

//matchesGeneralCategories
