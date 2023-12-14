import { assertStrictEquals, assertThrows } from "./deps.ts";
import { Rune } from "../mod.ts";

Deno.test("Rune.isRune(string)", () => {
  assertStrictEquals(Rune.isRune(""), false);
  assertStrictEquals(Rune.isRune("\u0000"), true);
  assertStrictEquals(Rune.isRune("\uFFFF"), true);
  assertStrictEquals(Rune.isRune("a"), true);
  assertStrictEquals(Rune.isRune("あ"), true);
  assertStrictEquals(Rune.isRune("\u{10FFFF}"), true);
  assertStrictEquals(Rune.isRune("\uD800"), true);
  assertStrictEquals(Rune.isRune("\uD800\uDC00"), true);
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

Deno.test("Rune.segment(string, number)", () => {
  assertStrictEquals([...Rune.segment("", 2)].join(","), "");
  assertStrictEquals([...Rune.segment("abc", 2)].join(","), "ab,c");

  assertThrows(
    () => {
      [...Rune.segment(1 as unknown as string, 0)];
    },
    TypeError,
    undefined,
    "input",
  );

  assertThrows(
    () => {
      [...Rune.segment("", 0)];
    },
    TypeError,
    undefined,
    "runeCount",
  );

  assertStrictEquals(
    [...Rune.segment("\u{10000}\u{10001}\u{10002}", 2)].join(","),
    "\u{10000}\u{10001},\u{10002}",
  );
});

Deno.test("Rune.segment(string, number, string)", () => {
  assertStrictEquals([...Rune.segment("", 2, "X")].join(","), "");
  assertStrictEquals([...Rune.segment("abc", 2, "X")].join(","), "ab,cX");
  assertStrictEquals([...Rune.segment("あいう", 2, "X")].join(","), "あい,うX");
  assertStrictEquals(
    [...Rune.segment("あ\uD800\uDC00う", 2, "X")].join(","),
    "あ\uD800\uDC00,うX",
  );
  assertStrictEquals(
    [...Rune.segment("あい\uD800\uDC00", 2, "X")].join(","),
    "あい,\uD800\uDC00X",
  );

  //
  assertStrictEquals(
    [...Rune.segment("🤷🏽‍♀️", 2, "X")].join(","),
    "\u{d83e}\u{dd37}\u{d83c}\u{dffd},\u{200d}\u{2640},\u{fe0f}X",
  );

  assertThrows(
    () => {
      [...Rune.segment("", 1, "")];
    },
    TypeError,
    undefined,
    "paddingRune",
  );

  assertThrows(
    () => {
      [...Rune.segment("", 1, "XX")];
    },
    TypeError,
    undefined,
    "paddingRune",
  );
});
