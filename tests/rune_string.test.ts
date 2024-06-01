import { assertStrictEquals, assertThrows } from "./deps.ts";
import { Unicode } from "../mod.ts";
const { RuneString } = Unicode;

Deno.test("RuneString.isRuneString(any)", () => {
  assertStrictEquals(RuneString.isRuneString(""), false);
  assertStrictEquals(RuneString.isRuneString("1"), true);
  assertStrictEquals(RuneString.isRuneString("11"), false);
  assertStrictEquals(RuneString.isRuneString("111"), false);
  
  assertStrictEquals(RuneString.isRuneString("\u{0}"), true);
  assertStrictEquals(RuneString.isRuneString("\u{10FFFF}"), true);
  assertStrictEquals(RuneString.isRuneString("\u{D7FF}"), true);
  assertStrictEquals(RuneString.isRuneString("\u{D800}"), false);
  assertStrictEquals(RuneString.isRuneString("\u{DBFF}"), false);
  assertStrictEquals(RuneString.isRuneString("\u{DC00}"), false);
  assertStrictEquals(RuneString.isRuneString("\u{DFFF}"), false);
  assertStrictEquals(RuneString.isRuneString("\u{E000}"), true);
  
  assertStrictEquals(RuneString.isRuneString("\u{10000}\u{D800}"), false);
  assertStrictEquals(RuneString.isRuneString("\u{DC00}\u{D800}"), false);
  assertStrictEquals(RuneString.isRuneString("\u{D800}\u{DC00}"), true);
});
