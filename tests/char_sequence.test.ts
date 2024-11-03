import { assertStrictEquals, assertThrows } from "./deps.ts";
import { CharSequence } from "../mod.ts";

function _iToS(iterable: Iterable<string | number>): string {
  return JSON.stringify([...iterable]);
}

Deno.test("CharSequence.toChars()", () => {
  assertStrictEquals(_iToS(CharSequence.toChars("")), `[]`);
  assertStrictEquals(_iToS(CharSequence.toChars("012")), `["0","1","2"]`);
  assertStrictEquals(_iToS(CharSequence.toChars("あい")), `["あ","い"]`);
  assertStrictEquals(
    _iToS(CharSequence.toChars("\u{2000B}")),
    `["\\ud840","\\udc0b"]`,
  );
  assertStrictEquals(
    _iToS(CharSequence.toChars("\u{dc0b}\u{d840}")),
    `["\\udc0b","\\ud840"]`,
  );

  assertStrictEquals(
    _iToS(CharSequence.toChars("𩸽が塚󠄁")),
    `["\\ud867","\\ude3d","\u304b","\u3099","\u585A","\\udb40","\\udd01"]`,
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
  assertStrictEquals(_iToS(CharSequence.toRunes("")), `[]`);
  assertStrictEquals(_iToS(CharSequence.toRunes("012")), `["0","1","2"]`);
  assertStrictEquals(_iToS(CharSequence.toRunes("あい")), `["あ","い"]`);
  assertStrictEquals(_iToS(CharSequence.toRunes("\u{2000B}")), `["\u{2000B}"]`); // JSONの仕様ではサロゲートペアをエスケープするだったような

  assertStrictEquals(_iToS(CharSequence.toRunes("g̈")), `["\u0067","\u0308"]`);
  assertStrictEquals(_iToS(CharSequence.toRunes("각")), `["\uAC01"]`);
  assertStrictEquals(
    _iToS(CharSequence.toRunes("각")),
    `["\u1100","\u1161","\u11A8"]`,
  );
  assertStrictEquals(_iToS(CharSequence.toRunes("ก")), `["\u0E01"]`);

  assertStrictEquals(_iToS(CharSequence.toRunes("நி")), `["\u0BA8","\u0BBF"]`);
  assertStrictEquals(_iToS(CharSequence.toRunes("เ")), `["\u0E40"]`);
  assertStrictEquals(_iToS(CharSequence.toRunes("กำ")), `["\u0E01","\u0E33"]`);
  assertStrictEquals(_iToS(CharSequence.toRunes("षि")), `["\u0937","\u093F"]`);
  assertStrictEquals(
    _iToS(CharSequence.toRunes("क्षि")),
    `["\u0915","\u094D","\u0937","\u093F"]`,
  );

  assertStrictEquals(_iToS(CharSequence.toRunes("ำ")), `["\u0E33"]`);
  assertStrictEquals(_iToS(CharSequence.toRunes("ष")), `["\u0937"]`);
  assertStrictEquals(_iToS(CharSequence.toRunes("ि")), `["\u093F"]`);

  assertStrictEquals(_iToS(CharSequence.toRunes("ch")), `["\u0063","\u0068"]`);
  assertStrictEquals(_iToS(CharSequence.toRunes("kʷ")), `["\u006B","\u02B7"]`);

  assertStrictEquals(_iToS(CharSequence.toRunes("Ą́")), `["\u0104","\u0301"]`);

  assertStrictEquals(
    _iToS(CharSequence.toRunes("𩸽が塚󠄁")),
    `["\u{29E3D}","\u304b","\u3099","\u585A","\u{E0101}"]`,
  );

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
  assertStrictEquals(_iToS(CharSequence.toCodePoints("")), `[]`);
  assertStrictEquals(_iToS(CharSequence.toCodePoints("012")), `[48,49,50]`);
  assertStrictEquals(_iToS(CharSequence.toCodePoints("あい")), `[12354,12356]`);
  assertStrictEquals(_iToS(CharSequence.toCodePoints("\u{2000B}")), `[131083]`); // JSONの仕様ではサロゲートペアをエスケープするだったような

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

Deno.test("CharSequence.toGraphemes()", () => {
  assertStrictEquals(_iToS(CharSequence.toGraphemes("")), `[]`);
  assertStrictEquals(_iToS(CharSequence.toGraphemes("012")), `["0","1","2"]`);
  assertStrictEquals(_iToS(CharSequence.toGraphemes("あい")), `["あ","い"]`);
  assertStrictEquals(
    _iToS(CharSequence.toGraphemes("\u{2000B}")),
    `["\u{2000B}"]`,
  );

  const e1 = "`source` must be an USVString.";
  assertThrows(
    () => {
      [...CharSequence.toGraphemes(undefined as unknown as string)];
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      [...CharSequence.toGraphemes("\u{dc0b}\u{d840}")];
    },
    TypeError,
    e1,
  );

  assertStrictEquals(_iToS(CharSequence.toGraphemes("0", "en")), `["0"]`);
  assertStrictEquals(_iToS(CharSequence.toGraphemes("0", "en-US")), `["0"]`);
  // assertStrictEquals(_iToS(CharSequence.toGraphemes("0", "en-Latn-US")), `["0"]`,);

  assertStrictEquals(_iToS(CharSequence.toGraphemes("0", "ja")), `["0"]`);
  // assertStrictEquals(_iToS(CharSequence.toGraphemes("0", "ja-Jpan")), `["0"]`);
  assertStrictEquals(_iToS(CharSequence.toGraphemes("0", "ja-JP")), `["0"]`);
  // assertStrictEquals(_iToS(CharSequence.toGraphemes("0", "ja-Jpan-JP")), `["0"]`);

  assertStrictEquals(
    _iToS(CharSequence.toGraphemes("g̈", "en")),
    `["\u0067\u0308"]`,
  );
  assertStrictEquals(_iToS(CharSequence.toGraphemes("각")), `["\uAC01"]`);
  assertStrictEquals(
    _iToS(CharSequence.toGraphemes("각")),
    `["\u1100\u1161\u11A8"]`,
  );
  assertStrictEquals(_iToS(CharSequence.toGraphemes("ก")), `["\u0E01"]`);

  assertStrictEquals(_iToS(CharSequence.toGraphemes("நி")), `["\u0BA8\u0BBF"]`);
  assertStrictEquals(_iToS(CharSequence.toGraphemes("เ")), `["\u0E40"]`);
  assertStrictEquals(_iToS(CharSequence.toGraphemes("กำ")), `["\u0E01\u0E33"]`);
  assertStrictEquals(_iToS(CharSequence.toGraphemes("षि")), `["\u0937\u093F"]`);
  assertStrictEquals(
    _iToS(CharSequence.toGraphemes("क्षि")),
    `["\u0915\u094D\u0937\u093F"]`,
  );

  assertStrictEquals(_iToS(CharSequence.toGraphemes("ำ")), `["\u0E33"]`);
  assertStrictEquals(_iToS(CharSequence.toGraphemes("ष")), `["\u0937"]`);
  assertStrictEquals(_iToS(CharSequence.toGraphemes("ि")), `["\u093F"]`);

  // assertStrictEquals(_iToS(CharSequence.toGraphemes("ch")), `["\u0063","\u0068"]`);
  // assertStrictEquals(_iToS(CharSequence.toGraphemes("ch", "sk")), `["\u0063\u0068"]`);
  // assertStrictEquals(_iToS(CharSequence.toGraphemes("kʷ")), `["\u006B","\u02B7"]`);

  assertStrictEquals(_iToS(CharSequence.toGraphemes("Ą́")), `["\u0104\u0301"]`);

  assertStrictEquals(
    _iToS(CharSequence.toGraphemes("𩸽が塚󠄁")),
    `["\u{29E3D}","\u304b\u3099","\u585A\u{E0101}"]`,
  );
  assertStrictEquals(
    _iToS(CharSequence.toGraphemes("𩸽が塚󠄁".normalize("NFC"))),
    `["\u{29E3D}","\u304C","\u585A\u{E0101}"]`,
  );
});

const HTTP_TAB_OR_SPACE = "[\\u{9}\\u{20}]+";

Deno.test("CharSequence.matches()", () => {
  assertStrictEquals(CharSequence.matches("", HTTP_TAB_OR_SPACE), false);
  assertStrictEquals(CharSequence.matches("\u0008", HTTP_TAB_OR_SPACE), false);
  assertStrictEquals(CharSequence.matches("\t", HTTP_TAB_OR_SPACE), true);
  assertStrictEquals(CharSequence.matches("\u000A", HTTP_TAB_OR_SPACE), false);
  assertStrictEquals(CharSequence.matches("\u001F", HTTP_TAB_OR_SPACE), false);
  assertStrictEquals(CharSequence.matches(" ", HTTP_TAB_OR_SPACE), true);
  assertStrictEquals(CharSequence.matches("\u0021", HTTP_TAB_OR_SPACE), false);
  assertStrictEquals(CharSequence.matches("a", HTTP_TAB_OR_SPACE), false);
  assertStrictEquals(
    CharSequence.matches("\t      \t    ", HTTP_TAB_OR_SPACE),
    true,
  );
  assertStrictEquals(CharSequence.matches("az", "[\\u{41}\\u{5A}]+"), false);
  assertStrictEquals(CharSequence.matches("AZ", "[\\u{41}\\u{5A}]+"), true);
  assertStrictEquals(CharSequence.matches("azAZ", "[\\u{41}\\u{5A}]+"), false);

  assertStrictEquals(
    CharSequence.matches(undefined as unknown as string, HTTP_TAB_OR_SPACE),
    false,
  );
  assertStrictEquals(
    CharSequence.matches("", undefined as unknown as string),
    false,
  );
});

Deno.test("CharSequence.contains()", () => {
  assertStrictEquals(CharSequence.contains("", HTTP_TAB_OR_SPACE), false);
  assertStrictEquals(CharSequence.contains("\u0008", HTTP_TAB_OR_SPACE), false);
  assertStrictEquals(CharSequence.contains("\t", HTTP_TAB_OR_SPACE), true);
  assertStrictEquals(CharSequence.contains("\u000A", HTTP_TAB_OR_SPACE), false);
  assertStrictEquals(CharSequence.contains("\u001F", HTTP_TAB_OR_SPACE), false);
  assertStrictEquals(CharSequence.contains(" ", HTTP_TAB_OR_SPACE), true);
  assertStrictEquals(CharSequence.contains("\u0021", HTTP_TAB_OR_SPACE), false);
  assertStrictEquals(CharSequence.contains("a", HTTP_TAB_OR_SPACE), false);
  assertStrictEquals(
    CharSequence.contains("\t      \t    ", HTTP_TAB_OR_SPACE),
    true,
  );
  assertStrictEquals(CharSequence.contains("az", "[\\u{41}\\u{5A}]+"), false);
  assertStrictEquals(CharSequence.contains("AZ", "[\\u{41}\\u{5A}]+"), true);
  assertStrictEquals(CharSequence.contains("azAZ", "[\\u{41}\\u{5A}]+"), true);

  assertStrictEquals(CharSequence.contains("x x", HTTP_TAB_OR_SPACE), true);
  assertStrictEquals(CharSequence.contains(" x", HTTP_TAB_OR_SPACE), true);
  assertStrictEquals(CharSequence.contains("x ", HTTP_TAB_OR_SPACE), true);

  assertStrictEquals(
    CharSequence.contains(undefined as unknown as string, HTTP_TAB_OR_SPACE),
    false,
  );
  assertStrictEquals(
    CharSequence.contains("", undefined as unknown as string),
    false,
  );
});
