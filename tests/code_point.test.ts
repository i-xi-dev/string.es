import { assertStrictEquals } from "./deps.ts";
import { CodePoint } from "../mod.ts";

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
