import { assertStrictEquals, assertThrows } from "./deps.ts";
import { Unicode } from "../mod.ts";
import { CodePoint } from "../mod.ts";
const { Block } = Unicode;

Deno.test("CodePoint.isCodePoint(number)", () => {
  assertStrictEquals(CodePoint.isCodePoint(-1), false);
  assertStrictEquals(CodePoint.isCodePoint(-0), true);
  assertStrictEquals(CodePoint.isCodePoint(0), true);
  assertStrictEquals(CodePoint.isCodePoint(63), true);
  assertStrictEquals(CodePoint.isCodePoint(64), true);
  assertStrictEquals(CodePoint.isCodePoint(127), true);
  assertStrictEquals(CodePoint.isCodePoint(128), true);
  assertStrictEquals(CodePoint.isCodePoint(255), true);
  assertStrictEquals(CodePoint.isCodePoint(256), true);
  assertStrictEquals(CodePoint.isCodePoint(65535), true);
  assertStrictEquals(CodePoint.isCodePoint(65536), true);
  assertStrictEquals(CodePoint.isCodePoint(0x10FFFF), true);
  assertStrictEquals(CodePoint.isCodePoint(0x110000), false);
  assertStrictEquals(CodePoint.isCodePoint(0xFFFFFFFF), false);
  assertStrictEquals(CodePoint.isCodePoint(0x100000000), false);
  assertStrictEquals(CodePoint.isCodePoint(0.1), false);
});

Deno.test("CodePoint.isCodePoint(any)", () => {
  assertStrictEquals(CodePoint.isCodePoint("0"), false);
  assertStrictEquals(CodePoint.isCodePoint("255"), false);
  assertStrictEquals(CodePoint.isCodePoint(true), false);
  assertStrictEquals(CodePoint.isCodePoint({}), false);
  assertStrictEquals(CodePoint.isCodePoint([]), false);
  assertStrictEquals(CodePoint.isCodePoint([0]), false);
  assertStrictEquals(CodePoint.isCodePoint(undefined), false);
  assertStrictEquals(CodePoint.isCodePoint(null), false);
});

Deno.test("CodePoint.toString(number)", () => {
  assertStrictEquals(CodePoint.toString(0x0), "U+0000");
  assertStrictEquals(CodePoint.toString(0xFFFF), "U+FFFF");
  assertStrictEquals(CodePoint.toString(0x10000), "U+10000");
  assertStrictEquals(CodePoint.toString(0x10FFFF), "U+10FFFF");

  assertThrows(
    () => {
      CodePoint.toString(-1);
    },
    TypeError,
    "codePoint",
  );

  assertThrows(
    () => {
      CodePoint.toString(0x110000);
    },
    TypeError,
    "codePoint",
  );

  assertThrows(
    () => {
      CodePoint.toString("0" as unknown as number);
    },
    TypeError,
    "codePoint",
  );
});

Deno.test("CodePoint.inBlock(any, number)", () => {
  assertStrictEquals(
    CodePoint.inBlock(0x0, Block.C0_CONTROLS_AND_BASIC_LATIN),
    true,
  );
  assertStrictEquals(
    CodePoint.inBlock(0x7F, Block.C0_CONTROLS_AND_BASIC_LATIN),
    true,
  );
  assertStrictEquals(
    CodePoint.inBlock(0x80, Block.C0_CONTROLS_AND_BASIC_LATIN),
    false,
  );
  assertStrictEquals(
    CodePoint.inBlock(-1, Block.C0_CONTROLS_AND_BASIC_LATIN),
    false,
  );

  assertThrows(
    () => {
      CodePoint.inBlock(0, 0 as unknown as Unicode.Block);
    },
    TypeError,
    "block",
  );
});

Deno.test("CodePoint.inBlocks(any, number[])", () => {
  const blocks1 = [
    Block.C0_CONTROLS_AND_BASIC_LATIN,
    Block.C1_CONTROLS_AND_LATIN_1_SUPPLEMENT,
  ];

  assertStrictEquals(CodePoint.inBlocks(0x0, blocks1), true);
  assertStrictEquals(CodePoint.inBlocks(0x7F, blocks1), true);
  assertStrictEquals(CodePoint.inBlocks(0x80, blocks1), true);
  assertStrictEquals(CodePoint.inBlocks(0xFF, blocks1), true);
  assertStrictEquals(CodePoint.inBlocks(0x100, blocks1), false);
  assertStrictEquals(CodePoint.inBlocks(-1, blocks1), false);

  const blocks2 = [
    Block.C1_CONTROLS_AND_LATIN_1_SUPPLEMENT,
    Block.C0_CONTROLS_AND_BASIC_LATIN,
  ];

  assertStrictEquals(CodePoint.inBlocks(0x0, blocks2), true);
  assertStrictEquals(CodePoint.inBlocks(0x7F, blocks2), true);
  assertStrictEquals(CodePoint.inBlocks(0x80, blocks2), true);
  assertStrictEquals(CodePoint.inBlocks(0xFF, blocks2), true);
  assertStrictEquals(CodePoint.inBlocks(0x100, blocks2), false);
  assertStrictEquals(CodePoint.inBlocks(-1, blocks2), false);

  assertThrows(
    () => {
      CodePoint.inBlocks(0, [0 as unknown as Unicode.Block]);
    },
    TypeError,
    "block",
  );

  assertThrows(
    () => {
      CodePoint.inBlocks(0, [
        Block.C0_CONTROLS_AND_BASIC_LATIN,
        0 as unknown as Unicode.Block,
      ]);
    },
    TypeError,
    "block",
  );

  assertThrows(
    () => {
      CodePoint.inBlocks(0, [
        0 as unknown as Unicode.Block,
        Block.C0_CONTROLS_AND_BASIC_LATIN,
      ]);
    },
    TypeError,
    "block",
  );
});

Deno.test("CodePoint.isHighSurrogate(any)", () => {
  assertStrictEquals(CodePoint.isHighSurrogate(0xD7FF), false);
  assertStrictEquals(CodePoint.isHighSurrogate(0xD800), true);
  assertStrictEquals(CodePoint.isHighSurrogate(0xDBFF), true);
  assertStrictEquals(CodePoint.isHighSurrogate(0xDC00), false);
  assertStrictEquals(CodePoint.isHighSurrogate(0xDFFF), false);
  assertStrictEquals(CodePoint.isHighSurrogate(0xE000), false);
});

Deno.test("CodePoint.isLowSurrogate(any)", () => {
  assertStrictEquals(CodePoint.isLowSurrogate(0xD7FF), false);
  assertStrictEquals(CodePoint.isLowSurrogate(0xD800), false);
  assertStrictEquals(CodePoint.isLowSurrogate(0xDBFF), false);
  assertStrictEquals(CodePoint.isLowSurrogate(0xDC00), true);
  assertStrictEquals(CodePoint.isLowSurrogate(0xDFFF), true);
  assertStrictEquals(CodePoint.isLowSurrogate(0xE000), false);
});

Deno.test("CodePoint.isSurrogate(any)", () => {
  assertStrictEquals(CodePoint.isSurrogate(0xD7FF), false);
  assertStrictEquals(CodePoint.isSurrogate(0xD800), true);
  assertStrictEquals(CodePoint.isSurrogate(0xDBFF), true);
  assertStrictEquals(CodePoint.isSurrogate(0xDC00), true);
  assertStrictEquals(CodePoint.isSurrogate(0xDFFF), true);
  assertStrictEquals(CodePoint.isSurrogate(0xE000), false);
});

Deno.test("CodePoint.planeOf(number)", () => {
  assertStrictEquals(CodePoint.planeOf(0x0), 0);
  assertStrictEquals(CodePoint.planeOf(0xFFFF), 0);
  assertStrictEquals(CodePoint.planeOf(0x10000), 1);
  assertStrictEquals(CodePoint.planeOf(0x1FFFF), 1);
  assertStrictEquals(CodePoint.planeOf(0x20000), 2);
  assertStrictEquals(CodePoint.planeOf(0x2FFFF), 2);
  assertStrictEquals(CodePoint.planeOf(0x30000), 3);
  assertStrictEquals(CodePoint.planeOf(0x3FFFF), 3);
  assertStrictEquals(CodePoint.planeOf(0x40000), 4);
  assertStrictEquals(CodePoint.planeOf(0x4FFFF), 4);
  assertStrictEquals(CodePoint.planeOf(0x50000), 5);
  assertStrictEquals(CodePoint.planeOf(0x5FFFF), 5);
  assertStrictEquals(CodePoint.planeOf(0x60000), 6);
  assertStrictEquals(CodePoint.planeOf(0x6FFFF), 6);
  assertStrictEquals(CodePoint.planeOf(0x70000), 7);
  assertStrictEquals(CodePoint.planeOf(0x7FFFF), 7);
  assertStrictEquals(CodePoint.planeOf(0x80000), 8);
  assertStrictEquals(CodePoint.planeOf(0x8FFFF), 8);
  assertStrictEquals(CodePoint.planeOf(0x90000), 9);
  assertStrictEquals(CodePoint.planeOf(0x9FFFF), 9);
  assertStrictEquals(CodePoint.planeOf(0xA0000), 10);
  assertStrictEquals(CodePoint.planeOf(0xAFFFF), 10);
  assertStrictEquals(CodePoint.planeOf(0xB0000), 11);
  assertStrictEquals(CodePoint.planeOf(0xBFFFF), 11);
  assertStrictEquals(CodePoint.planeOf(0xC0000), 12);
  assertStrictEquals(CodePoint.planeOf(0xCFFFF), 12);
  assertStrictEquals(CodePoint.planeOf(0xD0000), 13);
  assertStrictEquals(CodePoint.planeOf(0xDFFFF), 13);
  assertStrictEquals(CodePoint.planeOf(0xE0000), 14);
  assertStrictEquals(CodePoint.planeOf(0xEFFFF), 14);
  assertStrictEquals(CodePoint.planeOf(0xF0000), 15);
  assertStrictEquals(CodePoint.planeOf(0xFFFFF), 15);
  assertStrictEquals(CodePoint.planeOf(0x100000), 16);
  assertStrictEquals(CodePoint.planeOf(0x10FFFF), 16);

  assertThrows(
    () => {
      CodePoint.planeOf(-1);
    },
    TypeError,
    "codePoint",
  );

  assertThrows(
    () => {
      CodePoint.planeOf(0x110000);
    },
    TypeError,
    "codePoint",
  );

  assertThrows(
    () => {
      CodePoint.planeOf("0" as unknown as number);
    },
    TypeError,
    "codePoint",
  );
});

Deno.test("CodePoint.inPlane(any, number)", () => {
  assertStrictEquals(CodePoint.inPlane(0x0, 0), true);
  assertStrictEquals(CodePoint.inPlane(0xFFFF, 0), true);
  assertStrictEquals(CodePoint.inPlane(0x0, 1), false);
  assertStrictEquals(CodePoint.inPlane(-1, 0), false);
  assertStrictEquals(CodePoint.inPlane(0.5, 1), false);
  assertStrictEquals(CodePoint.inPlane(0x11FFFF, 1), false);
  assertStrictEquals(CodePoint.inPlane(0x100000, 16), true);
  assertStrictEquals(CodePoint.inPlane(0x10FFFF, 16), true);

  assertThrows(
    () => {
      CodePoint.inPlane(0, undefined as unknown as 0);
    },
    TypeError,
    "plane",
  );

  assertThrows(
    () => {
      CodePoint.inPlane(0, "0" as unknown as 0);
    },
    TypeError,
    "plane",
  );

  assertThrows(
    () => {
      CodePoint.inPlane(0, -1 as 0);
    },
    TypeError,
    "plane",
  );

  assertThrows(
    () => {
      CodePoint.inPlane(0, 17 as 0);
    },
    TypeError,
    "plane",
  );
});

Deno.test("CodePoint.isBmp(any)", () => {
  assertStrictEquals(CodePoint.isBmp(-1), false);
  assertStrictEquals(CodePoint.isBmp(0x0), true);
  assertStrictEquals(CodePoint.isBmp(0xFFFF), true);
  assertStrictEquals(CodePoint.isBmp(0x10000), false);
  assertStrictEquals(CodePoint.isBmp(0x10FFFF), false);
});
