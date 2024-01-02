import { assertStrictEquals, assertThrows } from "./deps.ts";
import {
  collectStart,
  contains,
  endsWith,
  isNonEmptyString,
  matches,
  segment,
  startsWith,
  trim,
  trimEnd,
  trimStart,
} from "../mod.ts";

Deno.test("isNonEmptyString(string)", () => {
  assertStrictEquals(isNonEmptyString(""), false);
  assertStrictEquals(isNonEmptyString("a"), true);
  assertStrictEquals(isNonEmptyString("aa"), true);
});

Deno.test("isNonEmptyString(any)", () => {
  assertStrictEquals(
    isNonEmptyString(undefined as unknown as string),
    false,
  );
});

const HTTP_TAB_OR_SPACE = "[\\u{9}\\u{20}]+";

Deno.test("matches(string, string)", () => {
  assertStrictEquals(matches("", HTTP_TAB_OR_SPACE), false);
  assertStrictEquals(matches("\u0008", HTTP_TAB_OR_SPACE), false);
  assertStrictEquals(matches("\t", HTTP_TAB_OR_SPACE), true);
  assertStrictEquals(matches("\u000A", HTTP_TAB_OR_SPACE), false);
  assertStrictEquals(matches("\u001F", HTTP_TAB_OR_SPACE), false);
  assertStrictEquals(matches(" ", HTTP_TAB_OR_SPACE), true);
  assertStrictEquals(matches("\u0021", HTTP_TAB_OR_SPACE), false);
  assertStrictEquals(matches("a", HTTP_TAB_OR_SPACE), false);
  assertStrictEquals(
    matches("\t      \t    ", HTTP_TAB_OR_SPACE),
    true,
  );
  assertStrictEquals(matches("az", "[\\u{41}\\u{5A}]+"), false);
  assertStrictEquals(matches("AZ", "[\\u{41}\\u{5A}]+"), true);
  assertStrictEquals(matches("azAZ", "[\\u{41}\\u{5A}]+"), false);
});

Deno.test("contains(string, string)", () => {
  assertStrictEquals(contains("", HTTP_TAB_OR_SPACE), false);
  assertStrictEquals(contains("\u0008", HTTP_TAB_OR_SPACE), false);
  assertStrictEquals(contains("\t", HTTP_TAB_OR_SPACE), true);
  assertStrictEquals(contains("\u000A", HTTP_TAB_OR_SPACE), false);
  assertStrictEquals(contains("\u001F", HTTP_TAB_OR_SPACE), false);
  assertStrictEquals(contains(" ", HTTP_TAB_OR_SPACE), true);
  assertStrictEquals(contains("\u0021", HTTP_TAB_OR_SPACE), false);
  assertStrictEquals(contains("a", HTTP_TAB_OR_SPACE), false);
  assertStrictEquals(
    contains("\t      \t    ", HTTP_TAB_OR_SPACE),
    true,
  );
  assertStrictEquals(contains("az", "[\\u{41}\\u{5A}]+"), false);
  assertStrictEquals(contains("AZ", "[\\u{41}\\u{5A}]+"), true);
  assertStrictEquals(contains("azAZ", "[\\u{41}\\u{5A}]+"), true);

  assertStrictEquals(contains("x x", HTTP_TAB_OR_SPACE), true);
  assertStrictEquals(contains(" x", HTTP_TAB_OR_SPACE), true);
  assertStrictEquals(contains("x ", HTTP_TAB_OR_SPACE), true);
});

Deno.test("startsWith(string, string)", () => {
  assertStrictEquals(startsWith("", HTTP_TAB_OR_SPACE), false);
  assertStrictEquals(
    startsWith("\u0008", HTTP_TAB_OR_SPACE),
    false,
  );
  assertStrictEquals(startsWith("\t", HTTP_TAB_OR_SPACE), true);
  assertStrictEquals(
    startsWith("\u000A", HTTP_TAB_OR_SPACE),
    false,
  );
  assertStrictEquals(
    startsWith("\u001F", HTTP_TAB_OR_SPACE),
    false,
  );
  assertStrictEquals(startsWith(" ", HTTP_TAB_OR_SPACE), true);
  assertStrictEquals(
    startsWith("\u0021", HTTP_TAB_OR_SPACE),
    false,
  );
  assertStrictEquals(startsWith("a", HTTP_TAB_OR_SPACE), false);
  assertStrictEquals(
    startsWith("\t      \t    ", HTTP_TAB_OR_SPACE),
    true,
  );
  assertStrictEquals(startsWith("az", "[\\u{41}\\u{5A}]+"), false);
  assertStrictEquals(startsWith("AZ", "[\\u{41}\\u{5A}]+"), true);
  assertStrictEquals(startsWith("azAZ", "[\\u{41}\\u{5A}]+"), false);

  assertStrictEquals(startsWith("x x", HTTP_TAB_OR_SPACE), false);
  assertStrictEquals(startsWith(" x", HTTP_TAB_OR_SPACE), true);
  assertStrictEquals(startsWith("x ", HTTP_TAB_OR_SPACE), false);
});

Deno.test("endsWith(string, string)", () => {
  assertStrictEquals(endsWith("", HTTP_TAB_OR_SPACE), false);
  assertStrictEquals(endsWith("\u0008", HTTP_TAB_OR_SPACE), false);
  assertStrictEquals(endsWith("\t", HTTP_TAB_OR_SPACE), true);
  assertStrictEquals(endsWith("\u000A", HTTP_TAB_OR_SPACE), false);
  assertStrictEquals(endsWith("\u001F", HTTP_TAB_OR_SPACE), false);
  assertStrictEquals(endsWith(" ", HTTP_TAB_OR_SPACE), true);
  assertStrictEquals(endsWith("\u0021", HTTP_TAB_OR_SPACE), false);
  assertStrictEquals(endsWith("a", HTTP_TAB_OR_SPACE), false);
  assertStrictEquals(
    endsWith("\t      \t    ", HTTP_TAB_OR_SPACE),
    true,
  );
  assertStrictEquals(endsWith("az", "[\\u{41}\\u{5A}]+"), false);
  assertStrictEquals(endsWith("AZ", "[\\u{41}\\u{5A}]+"), true);
  assertStrictEquals(endsWith("azAZ", "[\\u{41}\\u{5A}]+"), true);

  assertStrictEquals(endsWith("x x", HTTP_TAB_OR_SPACE), false);
  assertStrictEquals(endsWith(" x", HTTP_TAB_OR_SPACE), false);
  assertStrictEquals(endsWith("x ", HTTP_TAB_OR_SPACE), true);
});

Deno.test("collectStart(string, string)", () => {
  assertStrictEquals(collectStart("", HTTP_TAB_OR_SPACE), "");
  assertStrictEquals(collectStart("\u0008", HTTP_TAB_OR_SPACE), "");
  assertStrictEquals(collectStart("\t", HTTP_TAB_OR_SPACE), "\t");
  assertStrictEquals(collectStart("\u000A", HTTP_TAB_OR_SPACE), "");
  assertStrictEquals(collectStart("\u001F", HTTP_TAB_OR_SPACE), "");
  assertStrictEquals(collectStart(" ", HTTP_TAB_OR_SPACE), " ");
  assertStrictEquals(collectStart("\u0021", HTTP_TAB_OR_SPACE), "");
  assertStrictEquals(collectStart("a", HTTP_TAB_OR_SPACE), "");
  assertStrictEquals(
    collectStart("\t      \t    ", HTTP_TAB_OR_SPACE),
    "\t      \t    ",
  );
  assertStrictEquals(collectStart("az", "[\\u{41}\\u{5A}]+"), "");
  assertStrictEquals(collectStart("AZ", "[\\u{41}\\u{5A}]+"), "AZ");
  assertStrictEquals(collectStart("azAZ", "[\\u{41}\\u{5A}]+"), "");

  assertStrictEquals(collectStart("x x", HTTP_TAB_OR_SPACE), "");
  assertStrictEquals(collectStart(" x", HTTP_TAB_OR_SPACE), " ");
  assertStrictEquals(collectStart("x ", HTTP_TAB_OR_SPACE), "");
});

Deno.test("trim(string, string)", () => {
  assertStrictEquals(trim("", HTTP_TAB_OR_SPACE), "");
  assertStrictEquals(trim("\u0008", HTTP_TAB_OR_SPACE), "\u0008");
  assertStrictEquals(trim("\t", HTTP_TAB_OR_SPACE), "");
  assertStrictEquals(trim("\u000A", HTTP_TAB_OR_SPACE), "\u000A");
  assertStrictEquals(trim("\u001F", HTTP_TAB_OR_SPACE), "\u001F");
  assertStrictEquals(trim(" ", HTTP_TAB_OR_SPACE), "");
  assertStrictEquals(trim("\u0021", HTTP_TAB_OR_SPACE), "\u0021");
  assertStrictEquals(trim("a", HTTP_TAB_OR_SPACE), "a");
  assertStrictEquals(trim("\t      \t    ", HTTP_TAB_OR_SPACE), "");
  assertStrictEquals(trim("az", "[\\u{41}\\u{5A}]+"), "az");
  assertStrictEquals(trim("AZ", "[\\u{41}\\u{5A}]+"), "");
  assertStrictEquals(trim("azAZ", "[\\u{41}\\u{5A}]+"), "az");

  assertStrictEquals(trim("x x", HTTP_TAB_OR_SPACE), "x x");
  assertStrictEquals(trim(" x", HTTP_TAB_OR_SPACE), "x");
  assertStrictEquals(trim("x ", HTTP_TAB_OR_SPACE), "x");
});

Deno.test("trimStart(string, string)", () => {
  assertStrictEquals(trimStart("", HTTP_TAB_OR_SPACE), "");
  assertStrictEquals(
    trimStart("\u0008", HTTP_TAB_OR_SPACE),
    "\u0008",
  );
  assertStrictEquals(trimStart("\t", HTTP_TAB_OR_SPACE), "");
  assertStrictEquals(
    trimStart("\u000A", HTTP_TAB_OR_SPACE),
    "\u000A",
  );
  assertStrictEquals(
    trimStart("\u001F", HTTP_TAB_OR_SPACE),
    "\u001F",
  );
  assertStrictEquals(trimStart(" ", HTTP_TAB_OR_SPACE), "");
  assertStrictEquals(
    trimStart("\u0021", HTTP_TAB_OR_SPACE),
    "\u0021",
  );
  assertStrictEquals(trimStart("a", HTTP_TAB_OR_SPACE), "a");
  assertStrictEquals(
    trimStart("\t      \t    ", HTTP_TAB_OR_SPACE),
    "",
  );
  assertStrictEquals(trimStart("az", "[\\u{41}\\u{5A}]+"), "az");
  assertStrictEquals(trimStart("AZ", "[\\u{41}\\u{5A}]+"), "");
  assertStrictEquals(
    trimStart("azAZ", "[\\u{41}\\u{5A}]+"),
    "azAZ",
  );

  assertStrictEquals(trimStart("x x", HTTP_TAB_OR_SPACE), "x x");
  assertStrictEquals(trimStart(" x", HTTP_TAB_OR_SPACE), "x");
  assertStrictEquals(trimStart("x ", HTTP_TAB_OR_SPACE), "x ");
});

Deno.test("trimEnd(string, string)", () => {
  assertStrictEquals(trimEnd("", HTTP_TAB_OR_SPACE), "");
  assertStrictEquals(
    trimEnd("\u0008", HTTP_TAB_OR_SPACE),
    "\u0008",
  );
  assertStrictEquals(trimEnd("\t", HTTP_TAB_OR_SPACE), "");
  assertStrictEquals(
    trimEnd("\u000A", HTTP_TAB_OR_SPACE),
    "\u000A",
  );
  assertStrictEquals(
    trimEnd("\u001F", HTTP_TAB_OR_SPACE),
    "\u001F",
  );
  assertStrictEquals(trimEnd(" ", HTTP_TAB_OR_SPACE), "");
  assertStrictEquals(
    trimEnd("\u0021", HTTP_TAB_OR_SPACE),
    "\u0021",
  );
  assertStrictEquals(trimEnd("a", HTTP_TAB_OR_SPACE), "a");
  assertStrictEquals(
    trimEnd("\t      \t    ", HTTP_TAB_OR_SPACE),
    "",
  );
  assertStrictEquals(trimEnd("az", "[\\u{41}\\u{5A}]+"), "az");
  assertStrictEquals(trimEnd("AZ", "[\\u{41}\\u{5A}]+"), "");
  assertStrictEquals(trimEnd("azAZ", "[\\u{41}\\u{5A}]+"), "az");

  assertStrictEquals(trimEnd("x x", HTTP_TAB_OR_SPACE), "x x");
  assertStrictEquals(trimEnd(" x", HTTP_TAB_OR_SPACE), " x");
  assertStrictEquals(trimEnd("x ", HTTP_TAB_OR_SPACE), "x");
});

Deno.test("segment(string, number)", () => {
  assertStrictEquals([...segment("", 2)].join(","), "");
  assertStrictEquals([...segment("abc", 2)].join(","), "ab,c");
  assertStrictEquals(
    [...segment("あいう", 2, "X")].join(","),
    "あい,うX",
  );
  assertStrictEquals(
    [...segment("あ\uD800\uDC00う", 2, "X")].join(","),
    "あ\uD800,\uDC00う",
  );
  assertStrictEquals(
    [...segment("あい\uD800\uDC00", 2, "X")].join(","),
    "あい,\uD800\uDC00",
  );

  //
  assertStrictEquals(
    [...segment("🤷🏽‍♀️", 2, "X")].join(","),
    "\u{d83e}\u{dd37},\u{d83c}\u{dffd},\u{200d}\u{2640},\u{fe0f}X",
  );

  assertThrows(
    () => {
      [...segment(1 as unknown as string, 0)];
    },
    TypeError,
    "input",
  );

  assertThrows(
    () => {
      [...segment("", 0)];
    },
    TypeError,
    "charCount",
  );

  assertStrictEquals(
    [...segment("\u{10000}\u{10001}\u{10002}", 2)].join(","),
    "\u{10000},\u{10001},\u{10002}",
  );
});

Deno.test("segment(string, number, string)", () => {
  assertStrictEquals([...segment("", 2, "X")].join(","), "");
  assertStrictEquals(
    [...segment("abc", 2, "X")].join(","),
    "ab,cX",
  );

  assertThrows(
    () => {
      [...segment("", 1, "")];
    },
    TypeError,
    "paddingChar",
  );

  assertThrows(
    () => {
      [...segment("", 1, "XX")];
    },
    TypeError,
    "paddingChar",
  );
});
