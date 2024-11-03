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
  assertStrictEquals(CharSequence.matches("", ""), true);
  assertStrictEquals(CharSequence.matches("0", ""), false);
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
  assertStrictEquals(CharSequence.contains("", ""), true);
  assertStrictEquals(CharSequence.contains("0", ""), true);
});

Deno.test("CharSequence.startsWith()", () => {
  assertStrictEquals(CharSequence.startsWith("", HTTP_TAB_OR_SPACE), false);
  assertStrictEquals(
    CharSequence.startsWith("\u0008", HTTP_TAB_OR_SPACE),
    false,
  );
  assertStrictEquals(CharSequence.startsWith("\t", HTTP_TAB_OR_SPACE), true);
  assertStrictEquals(
    CharSequence.startsWith("\u000A", HTTP_TAB_OR_SPACE),
    false,
  );
  assertStrictEquals(
    CharSequence.startsWith("\u001F", HTTP_TAB_OR_SPACE),
    false,
  );
  assertStrictEquals(CharSequence.startsWith(" ", HTTP_TAB_OR_SPACE), true);
  assertStrictEquals(
    CharSequence.startsWith("\u0021", HTTP_TAB_OR_SPACE),
    false,
  );
  assertStrictEquals(CharSequence.startsWith("a", HTTP_TAB_OR_SPACE), false);
  assertStrictEquals(
    CharSequence.startsWith("\t      \t    ", HTTP_TAB_OR_SPACE),
    true,
  );
  assertStrictEquals(CharSequence.startsWith("az", "[\\u{41}\\u{5A}]+"), false);
  assertStrictEquals(CharSequence.startsWith("AZ", "[\\u{41}\\u{5A}]+"), true);
  assertStrictEquals(
    CharSequence.startsWith("azAZ", "[\\u{41}\\u{5A}]+"),
    false,
  );

  assertStrictEquals(CharSequence.startsWith("x x", HTTP_TAB_OR_SPACE), false);
  assertStrictEquals(CharSequence.startsWith(" x", HTTP_TAB_OR_SPACE), true);
  assertStrictEquals(CharSequence.startsWith("x ", HTTP_TAB_OR_SPACE), false);

  assertStrictEquals(
    CharSequence.startsWith(undefined as unknown as string, HTTP_TAB_OR_SPACE),
    false,
  );
  assertStrictEquals(
    CharSequence.startsWith("", undefined as unknown as string),
    false,
  );
  assertStrictEquals(CharSequence.startsWith("", ""), true);
  assertStrictEquals(CharSequence.startsWith("0", ""), true);
});

Deno.test("CharSequence.endsWith()", () => {
  assertStrictEquals(CharSequence.endsWith("", HTTP_TAB_OR_SPACE), false);
  assertStrictEquals(CharSequence.endsWith("\u0008", HTTP_TAB_OR_SPACE), false);
  assertStrictEquals(CharSequence.endsWith("\t", HTTP_TAB_OR_SPACE), true);
  assertStrictEquals(CharSequence.endsWith("\u000A", HTTP_TAB_OR_SPACE), false);
  assertStrictEquals(CharSequence.endsWith("\u001F", HTTP_TAB_OR_SPACE), false);
  assertStrictEquals(CharSequence.endsWith(" ", HTTP_TAB_OR_SPACE), true);
  assertStrictEquals(CharSequence.endsWith("\u0021", HTTP_TAB_OR_SPACE), false);
  assertStrictEquals(CharSequence.endsWith("a", HTTP_TAB_OR_SPACE), false);
  assertStrictEquals(
    CharSequence.endsWith("\t      \t    ", HTTP_TAB_OR_SPACE),
    true,
  );
  assertStrictEquals(CharSequence.endsWith("az", "[\\u{41}\\u{5A}]+"), false);
  assertStrictEquals(CharSequence.endsWith("AZ", "[\\u{41}\\u{5A}]+"), true);
  assertStrictEquals(CharSequence.endsWith("azAZ", "[\\u{41}\\u{5A}]+"), true);

  assertStrictEquals(CharSequence.endsWith("x x", HTTP_TAB_OR_SPACE), false);
  assertStrictEquals(CharSequence.endsWith(" x", HTTP_TAB_OR_SPACE), false);
  assertStrictEquals(CharSequence.endsWith("x ", HTTP_TAB_OR_SPACE), true);

  assertStrictEquals(
    CharSequence.endsWith(undefined as unknown as string, HTTP_TAB_OR_SPACE),
    false,
  );
  assertStrictEquals(
    CharSequence.endsWith("", undefined as unknown as string),
    false,
  );
  assertStrictEquals(CharSequence.endsWith("", ""), true);
  assertStrictEquals(CharSequence.endsWith("0", ""), true);
});

Deno.test("CharSequence.collectStart()", () => {
  assertStrictEquals(CharSequence.collectStart("", HTTP_TAB_OR_SPACE), "");
  assertStrictEquals(
    CharSequence.collectStart("\u0008", HTTP_TAB_OR_SPACE),
    "",
  );
  assertStrictEquals(CharSequence.collectStart("\t", HTTP_TAB_OR_SPACE), "\t");
  assertStrictEquals(
    CharSequence.collectStart("\u000A", HTTP_TAB_OR_SPACE),
    "",
  );
  assertStrictEquals(
    CharSequence.collectStart("\u001F", HTTP_TAB_OR_SPACE),
    "",
  );
  assertStrictEquals(CharSequence.collectStart(" ", HTTP_TAB_OR_SPACE), " ");
  assertStrictEquals(
    CharSequence.collectStart("\u0021", HTTP_TAB_OR_SPACE),
    "",
  );
  assertStrictEquals(CharSequence.collectStart("a", HTTP_TAB_OR_SPACE), "");
  assertStrictEquals(
    CharSequence.collectStart("\t      \t    ", HTTP_TAB_OR_SPACE),
    "\t      \t    ",
  );
  assertStrictEquals(CharSequence.collectStart("az", "[\\u{41}\\u{5A}]+"), "");
  assertStrictEquals(
    CharSequence.collectStart("AZ", "[\\u{41}\\u{5A}]+"),
    "AZ",
  );
  assertStrictEquals(
    CharSequence.collectStart("azAZ", "[\\u{41}\\u{5A}]+"),
    "",
  );

  assertStrictEquals(CharSequence.collectStart("x x", HTTP_TAB_OR_SPACE), "");
  assertStrictEquals(CharSequence.collectStart(" x", HTTP_TAB_OR_SPACE), " ");
  assertStrictEquals(CharSequence.collectStart("x ", HTTP_TAB_OR_SPACE), "");

  const e1 = "`input` must be a `string`.";
  assertThrows(
    () => {
      [...CharSequence.collectStart(
        undefined as unknown as string,
        HTTP_TAB_OR_SPACE,
      )];
    },
    TypeError,
    e1,
  );

  const e2 = "`pattern` must be a `string`.";
  assertThrows(
    () => {
      [...CharSequence.collectStart("", undefined as unknown as string)];
    },
    TypeError,
    e2,
  );

  assertStrictEquals(CharSequence.collectStart("", ""), "");
  assertStrictEquals(CharSequence.collectStart("0", ""), "");
});

Deno.test("CharSequence.trim()", () => {
  assertStrictEquals(CharSequence.trim("", HTTP_TAB_OR_SPACE), "");
  assertStrictEquals(CharSequence.trim("\u0008", HTTP_TAB_OR_SPACE), "\u0008");
  assertStrictEquals(CharSequence.trim("\t", HTTP_TAB_OR_SPACE), "");
  assertStrictEquals(CharSequence.trim("\u000A", HTTP_TAB_OR_SPACE), "\u000A");
  assertStrictEquals(CharSequence.trim("\u001F", HTTP_TAB_OR_SPACE), "\u001F");
  assertStrictEquals(CharSequence.trim(" ", HTTP_TAB_OR_SPACE), "");
  assertStrictEquals(CharSequence.trim("\u0021", HTTP_TAB_OR_SPACE), "\u0021");
  assertStrictEquals(CharSequence.trim("a", HTTP_TAB_OR_SPACE), "a");
  assertStrictEquals(
    CharSequence.trim("\t      \t    ", HTTP_TAB_OR_SPACE),
    "",
  );
  assertStrictEquals(CharSequence.trim("az", "[\\u{41}\\u{5A}]+"), "az");
  assertStrictEquals(CharSequence.trim("AZ", "[\\u{41}\\u{5A}]+"), "");
  assertStrictEquals(CharSequence.trim("azAZ", "[\\u{41}\\u{5A}]+"), "az");

  assertStrictEquals(CharSequence.trim("x x", HTTP_TAB_OR_SPACE), "x x");
  assertStrictEquals(CharSequence.trim(" x", HTTP_TAB_OR_SPACE), "x");
  assertStrictEquals(CharSequence.trim("x ", HTTP_TAB_OR_SPACE), "x");

  const e1 = "`input` must be a `string`.";
  assertThrows(
    () => {
      [...CharSequence.trim(
        undefined as unknown as string,
        HTTP_TAB_OR_SPACE,
      )];
    },
    TypeError,
    e1,
  );

  const e2 = "`pattern` must be a `string`.";
  assertThrows(
    () => {
      [...CharSequence.trim("", undefined as unknown as string)];
    },
    TypeError,
    e2,
  );

  assertStrictEquals(CharSequence.trim("", ""), "");
  assertStrictEquals(CharSequence.trim("0", ""), "0");
});

Deno.test("CharSequence.trimStart()", () => {
  assertStrictEquals(CharSequence.trimStart("", HTTP_TAB_OR_SPACE), "");
  assertStrictEquals(
    CharSequence.trimStart("\u0008", HTTP_TAB_OR_SPACE),
    "\u0008",
  );
  assertStrictEquals(CharSequence.trimStart("\t", HTTP_TAB_OR_SPACE), "");
  assertStrictEquals(
    CharSequence.trimStart("\u000A", HTTP_TAB_OR_SPACE),
    "\u000A",
  );
  assertStrictEquals(
    CharSequence.trimStart("\u001F", HTTP_TAB_OR_SPACE),
    "\u001F",
  );
  assertStrictEquals(CharSequence.trimStart(" ", HTTP_TAB_OR_SPACE), "");
  assertStrictEquals(
    CharSequence.trimStart("\u0021", HTTP_TAB_OR_SPACE),
    "\u0021",
  );
  assertStrictEquals(CharSequence.trimStart("a", HTTP_TAB_OR_SPACE), "a");
  assertStrictEquals(
    CharSequence.trimStart("\t      \t    ", HTTP_TAB_OR_SPACE),
    "",
  );
  assertStrictEquals(CharSequence.trimStart("az", "[\\u{41}\\u{5A}]+"), "az");
  assertStrictEquals(CharSequence.trimStart("AZ", "[\\u{41}\\u{5A}]+"), "");
  assertStrictEquals(
    CharSequence.trimStart("azAZ", "[\\u{41}\\u{5A}]+"),
    "azAZ",
  );

  assertStrictEquals(CharSequence.trimStart("x x", HTTP_TAB_OR_SPACE), "x x");
  assertStrictEquals(CharSequence.trimStart(" x", HTTP_TAB_OR_SPACE), "x");
  assertStrictEquals(CharSequence.trimStart("x ", HTTP_TAB_OR_SPACE), "x ");

  const e1 = "`input` must be a `string`.";
  assertThrows(
    () => {
      [...CharSequence.trimStart(
        undefined as unknown as string,
        HTTP_TAB_OR_SPACE,
      )];
    },
    TypeError,
    e1,
  );

  const e2 = "`pattern` must be a `string`.";
  assertThrows(
    () => {
      [...CharSequence.trimStart("", undefined as unknown as string)];
    },
    TypeError,
    e2,
  );

  assertStrictEquals(CharSequence.trimStart("", ""), "");
  assertStrictEquals(CharSequence.trimStart("0", ""), "0");
});

Deno.test("CharSequence.trimEnd()", () => {
  assertStrictEquals(CharSequence.trimEnd("", HTTP_TAB_OR_SPACE), "");
  assertStrictEquals(
    CharSequence.trimEnd("\u0008", HTTP_TAB_OR_SPACE),
    "\u0008",
  );
  assertStrictEquals(CharSequence.trimEnd("\t", HTTP_TAB_OR_SPACE), "");
  assertStrictEquals(
    CharSequence.trimEnd("\u000A", HTTP_TAB_OR_SPACE),
    "\u000A",
  );
  assertStrictEquals(
    CharSequence.trimEnd("\u001F", HTTP_TAB_OR_SPACE),
    "\u001F",
  );
  assertStrictEquals(CharSequence.trimEnd(" ", HTTP_TAB_OR_SPACE), "");
  assertStrictEquals(
    CharSequence.trimEnd("\u0021", HTTP_TAB_OR_SPACE),
    "\u0021",
  );
  assertStrictEquals(CharSequence.trimEnd("a", HTTP_TAB_OR_SPACE), "a");
  assertStrictEquals(
    CharSequence.trimEnd("\t      \t    ", HTTP_TAB_OR_SPACE),
    "",
  );
  assertStrictEquals(CharSequence.trimEnd("az", "[\\u{41}\\u{5A}]+"), "az");
  assertStrictEquals(CharSequence.trimEnd("AZ", "[\\u{41}\\u{5A}]+"), "");
  assertStrictEquals(CharSequence.trimEnd("azAZ", "[\\u{41}\\u{5A}]+"), "az");

  assertStrictEquals(CharSequence.trimEnd("x x", HTTP_TAB_OR_SPACE), "x x");
  assertStrictEquals(CharSequence.trimEnd(" x", HTTP_TAB_OR_SPACE), " x");
  assertStrictEquals(CharSequence.trimEnd("x ", HTTP_TAB_OR_SPACE), "x");

  const e1 = "`input` must be a `string`.";
  assertThrows(
    () => {
      [...CharSequence.trimEnd(
        undefined as unknown as string,
        HTTP_TAB_OR_SPACE,
      )];
    },
    TypeError,
    e1,
  );

  const e2 = "`pattern` must be a `string`.";
  assertThrows(
    () => {
      [...CharSequence.trimEnd("", undefined as unknown as string)];
    },
    TypeError,
    e2,
  );

  assertStrictEquals(CharSequence.trimEnd("", ""), "");
  assertStrictEquals(CharSequence.trimEnd("0", ""), "0");
});

// Deno.test("segment(string, number)", () => {
//   assertStrictEquals([...segment("", 2)].join(","), "");
//   assertStrictEquals([...segment("abc", 2)].join(","), "ab,c");
//   assertStrictEquals(
//     [...segment("あいう", 2, "X")].join(","),
//     "あい,うX",
//   );
//   assertStrictEquals(
//     [...segment("あ\uD800\uDC00う", 2, "X")].join(","),
//     "あ\uD800,\uDC00う",
//   );
//   assertStrictEquals(
//     [...segment("あい\uD800\uDC00", 2, "X")].join(","),
//     "あい,\uD800\uDC00",
//   );
//
//   //
//   assertStrictEquals(
//     [...segment("🤷🏽‍♀️", 2, "X")].join(","),
//     "\u{d83e}\u{dd37},\u{d83c}\u{dffd},\u{200d}\u{2640},\u{fe0f}X",
//   );
//
//   assertThrows(
//     () => {
//       [...segment(1 as unknown as string, 0)];
//     },
//     TypeError,
//     "input",
//   );
//
//   assertThrows(
//     () => {
//       [...segment("", 0)];
//     },
//     TypeError,
//     "charCount",
//   );
//
//   assertStrictEquals(
//     [...segment("\u{10000}\u{10001}\u{10002}", 2)].join(","),
//     "\u{10000},\u{10001},\u{10002}",
//   );
// });

// Deno.test("segment(string, number, string)", () => {
//   assertStrictEquals([...segment("", 2, "X")].join(","), "");
//   assertStrictEquals(
//     [...segment("abc", 2, "X")].join(","),
//     "ab,cX",
//   );
//
//   assertThrows(
//     () => {
//       [...segment("", 1, "")];
//     },
//     TypeError,
//     "paddingChar",
//   );
//
//   assertThrows(
//     () => {
//       [...segment("", 1, "XX")];
//     },
//     TypeError,
//     "paddingChar",
//   );
// });
