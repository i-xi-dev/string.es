import { assertStrictEquals, assertThrows } from "./deps.ts";
import { Grapheme } from "../mod.ts";

Deno.test("Grapheme.isGrapheme(string)", () => {
  assertStrictEquals(Grapheme.isGrapheme(""), false);
  assertStrictEquals(Grapheme.isGrapheme("\u0000"), true);
  assertStrictEquals(Grapheme.isGrapheme("\uFFFF"), true);
  assertStrictEquals(Grapheme.isGrapheme("a"), true);
  assertStrictEquals(Grapheme.isGrapheme("あ"), true);
  assertStrictEquals(Grapheme.isGrapheme("\u{10FFFF}"), true);
  assertStrictEquals(Grapheme.isGrapheme("\uD800"), true);
  assertStrictEquals(Grapheme.isGrapheme("\uD800\uDC00"), true);
  assertStrictEquals(Grapheme.isGrapheme("\uD7FF\uDC00"), false);
  assertStrictEquals(Grapheme.isGrapheme("aa"), false);
  assertStrictEquals(Grapheme.isGrapheme("aaa"), false);

  //
  assertStrictEquals(Grapheme.isGrapheme("🤷🏽‍♀️"), true);
});

Deno.test("Grapheme.isGrapheme(any)", () => {
  assertStrictEquals(Grapheme.isGrapheme(undefined), false);
  assertStrictEquals(Grapheme.isGrapheme(1), false);
});

Deno.test("Grapheme.segment(string, number)", () => {
  assertStrictEquals([...Grapheme.segment("", 2)].join(","), "");
  assertStrictEquals([...Grapheme.segment("abc", 2)].join(","), "ab,c");
  assertStrictEquals(
    [...Grapheme.segment("あいう", 2, "X")].join(","),
    "あい,うX",
  );
  assertStrictEquals(
    [...Grapheme.segment("あ\uD800\uDC00う", 2, "X")].join(","),
    "あ\uD800\uDC00,うX",
  );
  assertStrictEquals(
    [...Grapheme.segment("あい\uD800\uDC00", 2, "X")].join(","),
    "あい,\uD800\uDC00X",
  );

  //
  assertStrictEquals(
    [...Grapheme.segment("🤷🏽‍♀️", 2, "X")].join(","),
    "🤷🏽‍♀️" + "X",
  );

  assertThrows(
    () => {
      [...Grapheme.segment(1 as unknown as string, 0)];
    },
    TypeError,
    undefined,
    "input",
  );

  assertThrows(
    () => {
      [...Grapheme.segment("", 0)];
    },
    TypeError,
    undefined,
    "runeCount",
  );

  assertStrictEquals(
    [...Grapheme.segment("\u{10000}\u{10001}\u{10002}", 2)].join(","),
    "\u{10000}\u{10001},\u{10002}",
  );
});

Deno.test("Grapheme.segment(string, number, string)", () => {
  assertStrictEquals([...Grapheme.segment("", 2, "X")].join(","), "");
  assertStrictEquals([...Grapheme.segment("abc", 2, "X")].join(","), "ab,cX");

  assertThrows(
    () => {
      [...Grapheme.segment("", 1, "")];
    },
    TypeError,
    undefined,
    "paddingRune",
  );

  assertThrows(
    () => {
      [...Grapheme.segment("", 1, "XX")];
    },
    TypeError,
    undefined,
    "paddingRune",
  );
});
