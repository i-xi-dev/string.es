import { assertStrictEquals, assertThrows } from "./deps.ts";
import { Unicode } from "../mod.ts";
const { Block, Rune } = Unicode;

Deno.test("Rune.toCodePoint(string)", () => {
  assertStrictEquals(Rune.toCodePoint("\u{0}"), 0x0);
  assertStrictEquals(Rune.toCodePoint("\u{10FFFF}"), 0x10FFFF);
  assertStrictEquals(Rune.toCodePoint("\u{D7FF}"), 0xD7FF);
  assertStrictEquals(Rune.toCodePoint("\u{E000}"), 0xE000);

  assertThrows(
    () => {
      Rune.toCodePoint("\u{D800}");
    },
    TypeError,
    "runeString",
  );
  assertThrows(
    () => {
      Rune.toCodePoint("\u{DBFF}");
    },
    TypeError,
    "runeString",
  );
  assertThrows(
    () => {
      Rune.toCodePoint("\u{DC00}");
    },
    TypeError,
    "runeString",
  );
  assertThrows(
    () => {
      Rune.toCodePoint("\u{DFFF}");
    },
    TypeError,
    "runeString",
  );

  assertThrows(
    () => {
      Rune.toCodePoint("");
    },
    TypeError,
    "runeString",
  );

  assertThrows(
    () => {
      Rune.toCodePoint("11");
    },
    TypeError,
    "runeString",
  );
});

Deno.test("Rune.planeOf(string)", () => {
  assertStrictEquals(Rune.planeOf("\u{0}"), 0);
  assertStrictEquals(Rune.planeOf("\u{FFFF}"), 0);
  assertStrictEquals(Rune.planeOf("\u{10000}"), 1);
  assertStrictEquals(Rune.planeOf("\u{1FFFF}"), 1);
  assertStrictEquals(Rune.planeOf("\u{20000}"), 2);
  assertStrictEquals(Rune.planeOf("\u{2FFFF}"), 2);
  assertStrictEquals(Rune.planeOf("\u{30000}"), 3);
  assertStrictEquals(Rune.planeOf("\u{3FFFF}"), 3);
  assertStrictEquals(Rune.planeOf("\u{40000}"), 4);
  assertStrictEquals(Rune.planeOf("\u{4FFFF}"), 4);
  assertStrictEquals(Rune.planeOf("\u{50000}"), 5);
  assertStrictEquals(Rune.planeOf("\u{5FFFF}"), 5);
  assertStrictEquals(Rune.planeOf("\u{60000}"), 6);
  assertStrictEquals(Rune.planeOf("\u{6FFFF}"), 6);
  assertStrictEquals(Rune.planeOf("\u{70000}"), 7);
  assertStrictEquals(Rune.planeOf("\u{7FFFF}"), 7);
  assertStrictEquals(Rune.planeOf("\u{80000}"), 8);
  assertStrictEquals(Rune.planeOf("\u{8FFFF}"), 8);
  assertStrictEquals(Rune.planeOf("\u{90000}"), 9);
  assertStrictEquals(Rune.planeOf("\u{9FFFF}"), 9);
  assertStrictEquals(Rune.planeOf("\u{A0000}"), 10);
  assertStrictEquals(Rune.planeOf("\u{AFFFF}"), 10);
  assertStrictEquals(Rune.planeOf("\u{B0000}"), 11);
  assertStrictEquals(Rune.planeOf("\u{BFFFF}"), 11);
  assertStrictEquals(Rune.planeOf("\u{C0000}"), 12);
  assertStrictEquals(Rune.planeOf("\u{CFFFF}"), 12);
  assertStrictEquals(Rune.planeOf("\u{D0000}"), 13);
  assertStrictEquals(Rune.planeOf("\u{DFFFF}"), 13);
  assertStrictEquals(Rune.planeOf("\u{E0000}"), 14);
  assertStrictEquals(Rune.planeOf("\u{EFFFF}"), 14);
  assertStrictEquals(Rune.planeOf("\u{F0000}"), 15);
  assertStrictEquals(Rune.planeOf("\u{FFFFF}"), 15);
  assertStrictEquals(Rune.planeOf("\u{100000}"), 16);
  assertStrictEquals(Rune.planeOf("\u{10FFFF}"), 16);

  assertThrows(
    () => {
      Rune.planeOf("");
    },
    TypeError,
    "runeString",
  );

  assertThrows(
    () => {
      Rune.planeOf("11");
    },
    TypeError,
    "runeString",
  );
});

Deno.test("Rune.isBmp(string)", () => {
  assertStrictEquals(Rune.isBmp("\u{0}"), true);
  assertStrictEquals(Rune.isBmp("\u{FFFF}"), true);
  assertStrictEquals(Rune.isBmp("\u{10000}"), false);
  assertStrictEquals(Rune.isBmp("\u{10FFFF}"), false);

  assertThrows(
    () => {
      Rune.isBmp("");
    },
    TypeError,
    "runeString",
  );

  assertThrows(
    () => {
      Rune.isBmp("11");
    },
    TypeError,
    "runeString",
  );
});

Deno.test("Rune.inPlanes(string, number[])", () => {
  assertStrictEquals(Rune.inPlanes("\u{0}", []), false);

  assertStrictEquals(Rune.inPlanes("\u{0}", [0]), true);
  assertStrictEquals(Rune.inPlanes("\u{FFFF}", [0]), true);
  assertStrictEquals(Rune.inPlanes("\u{0}", [1]), false);
  assertStrictEquals(Rune.inPlanes("\u{100000}", [16]), true);
  assertStrictEquals(Rune.inPlanes("\u{10FFFF}", [16]), true);

  assertStrictEquals(Rune.inPlanes("\u{0}", [0, 16]), true);
  assertStrictEquals(Rune.inPlanes("\u{FFFF}", [0, 16]), true);
  assertStrictEquals(Rune.inPlanes("\u{0}", [1, 16]), false);
  assertStrictEquals(Rune.inPlanes("\u{100000}", [0, 16]), true);
  assertStrictEquals(Rune.inPlanes("\u{10FFFF}", [0, 16]), true);

  assertThrows(
    () => {
      Rune.inPlanes("", []);
    },
    TypeError,
    "runeString",
  );

  assertThrows(
    () => {
      Rune.inPlanes("00", []);
    },
    TypeError,
    "runeString",
  );

  assertThrows(
    () => {
      Rune.inPlanes("0", undefined as unknown as []);
    },
    TypeError,
    "planes",
  );

  assertThrows(
    () => {
      Rune.inPlanes("0", "0" as unknown as []);
    },
    TypeError,
    "planes",
  );

  assertThrows(
    () => {
      Rune.inPlanes("0", [-1] as unknown as []);
    },
    TypeError,
    "planes[*]",
  );

  assertThrows(
    () => {
      Rune.inPlanes("0", [17] as unknown as []);
    },
    TypeError,
    "planes[*]",
  );
});

Deno.test("Rune.inCodePointRanges(string, number[])", () => {
  const blocks0: Array<[number] | [number, number]> = [];

  assertStrictEquals(Rune.inCodePointRanges("\u{0}", blocks0), false);
  assertStrictEquals(Rune.inCodePointRanges("\u{7F}", blocks0), false);
  assertStrictEquals(Rune.inCodePointRanges("\u{80}", blocks0), false);
  assertStrictEquals(Rune.inCodePointRanges("\u{FF}", blocks0), false);
  assertStrictEquals(Rune.inCodePointRanges("\u{100}", blocks0), false);

  const blocks1 = [
    Block.C0_CONTROLS_AND_BASIC_LATIN,
    Block.C1_CONTROLS_AND_LATIN_1_SUPPLEMENT,
  ];

  assertStrictEquals(Rune.inCodePointRanges("\u{0}", blocks1), true);
  assertStrictEquals(Rune.inCodePointRanges("\u{7F}", blocks1), true);
  assertStrictEquals(Rune.inCodePointRanges("\u{80}", blocks1), true);
  assertStrictEquals(Rune.inCodePointRanges("\u{FF}", blocks1), true);
  assertStrictEquals(Rune.inCodePointRanges("\u{100}", blocks1), false);

  const blocks2 = [
    Block.C1_CONTROLS_AND_LATIN_1_SUPPLEMENT,
    Block.C0_CONTROLS_AND_BASIC_LATIN,
  ];

  assertStrictEquals(Rune.inCodePointRanges("\u{0}", blocks2), true);
  assertStrictEquals(Rune.inCodePointRanges("\u{7F}", blocks2), true);
  assertStrictEquals(Rune.inCodePointRanges("\u{80}", blocks2), true);
  assertStrictEquals(Rune.inCodePointRanges("\u{FF}", blocks2), true);
  assertStrictEquals(Rune.inCodePointRanges("\u{100}", blocks2), false);

  assertThrows(
    () => {
      Rune.inCodePointRanges("", blocks1);
    },
    TypeError,
    "runeString",
  );

  assertThrows(
    () => {
      Rune.inCodePointRanges("00", blocks1);
    },
    TypeError,
    "runeString",
  );

  assertThrows(
    () => {
      Rune.inCodePointRanges("0", undefined as unknown as []);
    },
    TypeError,
    "ranges",
  );

  assertThrows(
    () => {
      Rune.inCodePointRanges("0", 0 as unknown as []);
    },
    TypeError,
    "ranges",
  );

  assertThrows(
    () => {
      Rune.inCodePointRanges("0", [0 as unknown as [0]]);
    },
    TypeError,
    "ranges[*]",
  );

  assertThrows(
    () => {
      Rune.inCodePointRanges("0", [
        Block.C0_CONTROLS_AND_BASIC_LATIN,
        0 as unknown as [0],
      ]);
    },
    TypeError,
    "ranges[*]",
  );

  assertThrows(
    () => {
      Rune.inCodePointRanges("0", [
        0 as unknown as [0],
        Block.C0_CONTROLS_AND_BASIC_LATIN,
      ]);
    },
    TypeError,
    "ranges[*]",
  );
});
