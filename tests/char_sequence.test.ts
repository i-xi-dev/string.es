import { assertStrictEquals, assertThrows } from "./deps.ts";
import { CharSequence } from "../mod.ts";

Deno.test("CharSequence.toChars()", () => {
  assertStrictEquals(JSON.stringify([...CharSequence.toChars("")]), `[]`);
  assertStrictEquals(
    JSON.stringify([...CharSequence.toChars("012")]),
    `["0","1","2"]`,
  );
  assertStrictEquals(
    JSON.stringify([...CharSequence.toChars("あい")]),
    `["あ","い"]`,
  );
  assertStrictEquals(
    JSON.stringify([...CharSequence.toChars("\u{2000B}")]),
    `["\\ud840","\\udc0b"]`,
  );
  assertStrictEquals(
    JSON.stringify([...CharSequence.toChars("\u{dc0b}\u{d840}")]),
    `["\\udc0b","\\ud840"]`,
  );

  const e1 = "`source` must be a `string`.";
  assertThrows(
    () => {
      [...CharSequence.toChars(undefined as unknown as string)];
    },
    TypeError,
    e1,
  );
});

Deno.test("CharSequence.charCountOf()", () => {
  assertStrictEquals(CharSequence.charCountOf(""), 0);
  assertStrictEquals(CharSequence.charCountOf("012"), 3);
  assertStrictEquals(CharSequence.charCountOf("あい"), 2);
  assertStrictEquals(CharSequence.charCountOf("\u{2000B}"), 2);
  assertStrictEquals(CharSequence.charCountOf("\u{dc0b}\u{d840}"), 2);

  const e1 = "`source` must be a `string`.";
  assertThrows(
    () => {
      CharSequence.charCountOf(undefined as unknown as string);
    },
    TypeError,
    e1,
  );
});

Deno.test("CharSequence.toRunes()", () => {
  assertStrictEquals(JSON.stringify([...CharSequence.toRunes("")]), `[]`);
  assertStrictEquals(
    JSON.stringify([...CharSequence.toRunes("012")]),
    `["0","1","2"]`,
  );
  assertStrictEquals(
    JSON.stringify([...CharSequence.toRunes("あい")]),
    `["あ","い"]`,
  );
  assertStrictEquals(
    JSON.stringify([...CharSequence.toRunes("\u{2000B}")]),
    `["\u{2000B}"]`,
  ); // JSONの仕様ではサロゲートペアをエスケープするだったような

  const e1 = "`source` must be an USVString.";
  assertThrows(
    () => {
      [...CharSequence.toRunes(undefined as unknown as string)];
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      [...CharSequence.toRunes("\u{dc0b}\u{d840}")];
    },
    TypeError,
    e1,
  );
});

Deno.test("CharSequence.runeCountOf()", () => {
  assertStrictEquals(CharSequence.runeCountOf(""), 0);
  assertStrictEquals(CharSequence.runeCountOf("012"), 3);
  assertStrictEquals(CharSequence.runeCountOf("あい"), 2);
  assertStrictEquals(CharSequence.runeCountOf("\u{2000B}"), 1);

  const e1 = "`source` must be an USVString.";
  assertThrows(
    () => {
      CharSequence.runeCountOf(undefined as unknown as string);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      CharSequence.runeCountOf("\u{dc0b}\u{d840}");
    },
    TypeError,
    e1,
  );
});

Deno.test("CharSequence.toCodePoints()", () => {
  assertStrictEquals(JSON.stringify([...CharSequence.toCodePoints("")]), `[]`);
  assertStrictEquals(
    JSON.stringify([...CharSequence.toCodePoints("012")]),
    `[48,49,50]`,
  );
  assertStrictEquals(
    JSON.stringify([...CharSequence.toCodePoints("あい")]),
    `[12354,12356]`,
  );
  assertStrictEquals(
    JSON.stringify([...CharSequence.toCodePoints("\u{2000B}")]),
    `[131083]`,
  ); // JSONの仕様ではサロゲートペアをエスケープするだったような

  const e1 = "`source` must be an USVString.";
  assertThrows(
    () => {
      [...CharSequence.toCodePoints(undefined as unknown as string)];
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      [...CharSequence.toCodePoints("\u{dc0b}\u{d840}")];
    },
    TypeError,
    e1,
  );
});
