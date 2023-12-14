import { assertStrictEquals, assertThrows } from "./deps.ts";
import { StringUtils } from "../mod.ts";

Deno.test("StringUtils.isNonEmptyString(string)", () => {
  assertStrictEquals(StringUtils.isNonEmptyString(""), false);
  assertStrictEquals(StringUtils.isNonEmptyString("a"), true);
  assertStrictEquals(StringUtils.isNonEmptyString("aa"), true);
});

Deno.test("StringUtils.isNonEmptyString(any)", () => {
  assertStrictEquals(
    StringUtils.isNonEmptyString(undefined as unknown as string),
    false,
  );
});

const HTTP_TAB_OR_SPACE = "[\\u{9}\\u{20}]+";

Deno.test("StringUtils.matches(string, string)", () => {
  assertStrictEquals(StringUtils.matches("", HTTP_TAB_OR_SPACE), false);
  assertStrictEquals(StringUtils.matches("\u0008", HTTP_TAB_OR_SPACE), false);
  assertStrictEquals(StringUtils.matches("\t", HTTP_TAB_OR_SPACE), true);
  assertStrictEquals(StringUtils.matches("\u000A", HTTP_TAB_OR_SPACE), false);
  assertStrictEquals(StringUtils.matches("\u001F", HTTP_TAB_OR_SPACE), false);
  assertStrictEquals(StringUtils.matches(" ", HTTP_TAB_OR_SPACE), true);
  assertStrictEquals(StringUtils.matches("\u0021", HTTP_TAB_OR_SPACE), false);
  assertStrictEquals(StringUtils.matches("a", HTTP_TAB_OR_SPACE), false);
  assertStrictEquals(
    StringUtils.matches("\t      \t    ", HTTP_TAB_OR_SPACE),
    true,
  );
  assertStrictEquals(StringUtils.matches("az", "[\\u{41}\\u{5A}]+"), false);
  assertStrictEquals(StringUtils.matches("AZ", "[\\u{41}\\u{5A}]+"), true);
  assertStrictEquals(StringUtils.matches("azAZ", "[\\u{41}\\u{5A}]+"), false);
});

Deno.test("StringUtils.contains(string, string)", () => {
  assertStrictEquals(StringUtils.contains("", HTTP_TAB_OR_SPACE), false);
  assertStrictEquals(StringUtils.contains("\u0008", HTTP_TAB_OR_SPACE), false);
  assertStrictEquals(StringUtils.contains("\t", HTTP_TAB_OR_SPACE), true);
  assertStrictEquals(StringUtils.contains("\u000A", HTTP_TAB_OR_SPACE), false);
  assertStrictEquals(StringUtils.contains("\u001F", HTTP_TAB_OR_SPACE), false);
  assertStrictEquals(StringUtils.contains(" ", HTTP_TAB_OR_SPACE), true);
  assertStrictEquals(StringUtils.contains("\u0021", HTTP_TAB_OR_SPACE), false);
  assertStrictEquals(StringUtils.contains("a", HTTP_TAB_OR_SPACE), false);
  assertStrictEquals(
    StringUtils.contains("\t      \t    ", HTTP_TAB_OR_SPACE),
    true,
  );
  assertStrictEquals(StringUtils.contains("az", "[\\u{41}\\u{5A}]+"), false);
  assertStrictEquals(StringUtils.contains("AZ", "[\\u{41}\\u{5A}]+"), true);
  assertStrictEquals(StringUtils.contains("azAZ", "[\\u{41}\\u{5A}]+"), true);

  assertStrictEquals(StringUtils.contains("x x", HTTP_TAB_OR_SPACE), true);
  assertStrictEquals(StringUtils.contains(" x", HTTP_TAB_OR_SPACE), true);
  assertStrictEquals(StringUtils.contains("x ", HTTP_TAB_OR_SPACE), true);
});

Deno.test("StringUtils.startsWith(string, string)", () => {
  assertStrictEquals(StringUtils.startsWith("", HTTP_TAB_OR_SPACE), false);
  assertStrictEquals(
    StringUtils.startsWith("\u0008", HTTP_TAB_OR_SPACE),
    false,
  );
  assertStrictEquals(StringUtils.startsWith("\t", HTTP_TAB_OR_SPACE), true);
  assertStrictEquals(
    StringUtils.startsWith("\u000A", HTTP_TAB_OR_SPACE),
    false,
  );
  assertStrictEquals(
    StringUtils.startsWith("\u001F", HTTP_TAB_OR_SPACE),
    false,
  );
  assertStrictEquals(StringUtils.startsWith(" ", HTTP_TAB_OR_SPACE), true);
  assertStrictEquals(
    StringUtils.startsWith("\u0021", HTTP_TAB_OR_SPACE),
    false,
  );
  assertStrictEquals(StringUtils.startsWith("a", HTTP_TAB_OR_SPACE), false);
  assertStrictEquals(
    StringUtils.startsWith("\t      \t    ", HTTP_TAB_OR_SPACE),
    true,
  );
  assertStrictEquals(StringUtils.startsWith("az", "[\\u{41}\\u{5A}]+"), false);
  assertStrictEquals(StringUtils.startsWith("AZ", "[\\u{41}\\u{5A}]+"), true);
  assertStrictEquals(
    StringUtils.startsWith("azAZ", "[\\u{41}\\u{5A}]+"),
    false,
  );

  assertStrictEquals(StringUtils.startsWith("x x", HTTP_TAB_OR_SPACE), false);
  assertStrictEquals(StringUtils.startsWith(" x", HTTP_TAB_OR_SPACE), true);
  assertStrictEquals(StringUtils.startsWith("x ", HTTP_TAB_OR_SPACE), false);
});

Deno.test("StringUtils.endsWith(string, string)", () => {
  assertStrictEquals(StringUtils.endsWith("", HTTP_TAB_OR_SPACE), false);
  assertStrictEquals(StringUtils.endsWith("\u0008", HTTP_TAB_OR_SPACE), false);
  assertStrictEquals(StringUtils.endsWith("\t", HTTP_TAB_OR_SPACE), true);
  assertStrictEquals(StringUtils.endsWith("\u000A", HTTP_TAB_OR_SPACE), false);
  assertStrictEquals(StringUtils.endsWith("\u001F", HTTP_TAB_OR_SPACE), false);
  assertStrictEquals(StringUtils.endsWith(" ", HTTP_TAB_OR_SPACE), true);
  assertStrictEquals(StringUtils.endsWith("\u0021", HTTP_TAB_OR_SPACE), false);
  assertStrictEquals(StringUtils.endsWith("a", HTTP_TAB_OR_SPACE), false);
  assertStrictEquals(
    StringUtils.endsWith("\t      \t    ", HTTP_TAB_OR_SPACE),
    true,
  );
  assertStrictEquals(StringUtils.endsWith("az", "[\\u{41}\\u{5A}]+"), false);
  assertStrictEquals(StringUtils.endsWith("AZ", "[\\u{41}\\u{5A}]+"), true);
  assertStrictEquals(StringUtils.endsWith("azAZ", "[\\u{41}\\u{5A}]+"), true);

  assertStrictEquals(StringUtils.endsWith("x x", HTTP_TAB_OR_SPACE), false);
  assertStrictEquals(StringUtils.endsWith(" x", HTTP_TAB_OR_SPACE), false);
  assertStrictEquals(StringUtils.endsWith("x ", HTTP_TAB_OR_SPACE), true);
});

Deno.test("StringUtils.collectStart(string, string)", () => {
  assertStrictEquals(StringUtils.collectStart("", HTTP_TAB_OR_SPACE), "");
  assertStrictEquals(StringUtils.collectStart("\u0008", HTTP_TAB_OR_SPACE), "");
  assertStrictEquals(StringUtils.collectStart("\t", HTTP_TAB_OR_SPACE), "\t");
  assertStrictEquals(StringUtils.collectStart("\u000A", HTTP_TAB_OR_SPACE), "");
  assertStrictEquals(StringUtils.collectStart("\u001F", HTTP_TAB_OR_SPACE), "");
  assertStrictEquals(StringUtils.collectStart(" ", HTTP_TAB_OR_SPACE), " ");
  assertStrictEquals(StringUtils.collectStart("\u0021", HTTP_TAB_OR_SPACE), "");
  assertStrictEquals(StringUtils.collectStart("a", HTTP_TAB_OR_SPACE), "");
  assertStrictEquals(
    StringUtils.collectStart("\t      \t    ", HTTP_TAB_OR_SPACE),
    "\t      \t    ",
  );
  assertStrictEquals(StringUtils.collectStart("az", "[\\u{41}\\u{5A}]+"), "");
  assertStrictEquals(StringUtils.collectStart("AZ", "[\\u{41}\\u{5A}]+"), "AZ");
  assertStrictEquals(StringUtils.collectStart("azAZ", "[\\u{41}\\u{5A}]+"), "");

  assertStrictEquals(StringUtils.collectStart("x x", HTTP_TAB_OR_SPACE), "");
  assertStrictEquals(StringUtils.collectStart(" x", HTTP_TAB_OR_SPACE), " ");
  assertStrictEquals(StringUtils.collectStart("x ", HTTP_TAB_OR_SPACE), "");
});

Deno.test("StringUtils.trim(string, string)", () => {
  assertStrictEquals(StringUtils.trim("", HTTP_TAB_OR_SPACE), "");
  assertStrictEquals(StringUtils.trim("\u0008", HTTP_TAB_OR_SPACE), "\u0008");
  assertStrictEquals(StringUtils.trim("\t", HTTP_TAB_OR_SPACE), "");
  assertStrictEquals(StringUtils.trim("\u000A", HTTP_TAB_OR_SPACE), "\u000A");
  assertStrictEquals(StringUtils.trim("\u001F", HTTP_TAB_OR_SPACE), "\u001F");
  assertStrictEquals(StringUtils.trim(" ", HTTP_TAB_OR_SPACE), "");
  assertStrictEquals(StringUtils.trim("\u0021", HTTP_TAB_OR_SPACE), "\u0021");
  assertStrictEquals(StringUtils.trim("a", HTTP_TAB_OR_SPACE), "a");
  assertStrictEquals(
    StringUtils.trim("\t      \t    ", HTTP_TAB_OR_SPACE),
    "",
  );
  assertStrictEquals(StringUtils.trim("az", "[\\u{41}\\u{5A}]+"), "az");
  assertStrictEquals(StringUtils.trim("AZ", "[\\u{41}\\u{5A}]+"), "");
  assertStrictEquals(StringUtils.trim("azAZ", "[\\u{41}\\u{5A}]+"), "az");

  assertStrictEquals(StringUtils.trim("x x", HTTP_TAB_OR_SPACE), "x x");
  assertStrictEquals(StringUtils.trim(" x", HTTP_TAB_OR_SPACE), "x");
  assertStrictEquals(StringUtils.trim("x ", HTTP_TAB_OR_SPACE), "x");
});

Deno.test("StringUtils.trimStart(string, string)", () => {
  assertStrictEquals(StringUtils.trimStart("", HTTP_TAB_OR_SPACE), "");
  assertStrictEquals(
    StringUtils.trimStart("\u0008", HTTP_TAB_OR_SPACE),
    "\u0008",
  );
  assertStrictEquals(StringUtils.trimStart("\t", HTTP_TAB_OR_SPACE), "");
  assertStrictEquals(
    StringUtils.trimStart("\u000A", HTTP_TAB_OR_SPACE),
    "\u000A",
  );
  assertStrictEquals(
    StringUtils.trimStart("\u001F", HTTP_TAB_OR_SPACE),
    "\u001F",
  );
  assertStrictEquals(StringUtils.trimStart(" ", HTTP_TAB_OR_SPACE), "");
  assertStrictEquals(
    StringUtils.trimStart("\u0021", HTTP_TAB_OR_SPACE),
    "\u0021",
  );
  assertStrictEquals(StringUtils.trimStart("a", HTTP_TAB_OR_SPACE), "a");
  assertStrictEquals(
    StringUtils.trimStart("\t      \t    ", HTTP_TAB_OR_SPACE),
    "",
  );
  assertStrictEquals(StringUtils.trimStart("az", "[\\u{41}\\u{5A}]+"), "az");
  assertStrictEquals(StringUtils.trimStart("AZ", "[\\u{41}\\u{5A}]+"), "");
  assertStrictEquals(
    StringUtils.trimStart("azAZ", "[\\u{41}\\u{5A}]+"),
    "azAZ",
  );

  assertStrictEquals(StringUtils.trimStart("x x", HTTP_TAB_OR_SPACE), "x x");
  assertStrictEquals(StringUtils.trimStart(" x", HTTP_TAB_OR_SPACE), "x");
  assertStrictEquals(StringUtils.trimStart("x ", HTTP_TAB_OR_SPACE), "x ");
});

Deno.test("StringUtils.trimEnd(string, string)", () => {
  assertStrictEquals(StringUtils.trimEnd("", HTTP_TAB_OR_SPACE), "");
  assertStrictEquals(
    StringUtils.trimEnd("\u0008", HTTP_TAB_OR_SPACE),
    "\u0008",
  );
  assertStrictEquals(StringUtils.trimEnd("\t", HTTP_TAB_OR_SPACE), "");
  assertStrictEquals(
    StringUtils.trimEnd("\u000A", HTTP_TAB_OR_SPACE),
    "\u000A",
  );
  assertStrictEquals(
    StringUtils.trimEnd("\u001F", HTTP_TAB_OR_SPACE),
    "\u001F",
  );
  assertStrictEquals(StringUtils.trimEnd(" ", HTTP_TAB_OR_SPACE), "");
  assertStrictEquals(
    StringUtils.trimEnd("\u0021", HTTP_TAB_OR_SPACE),
    "\u0021",
  );
  assertStrictEquals(StringUtils.trimEnd("a", HTTP_TAB_OR_SPACE), "a");
  assertStrictEquals(
    StringUtils.trimEnd("\t      \t    ", HTTP_TAB_OR_SPACE),
    "",
  );
  assertStrictEquals(StringUtils.trimEnd("az", "[\\u{41}\\u{5A}]+"), "az");
  assertStrictEquals(StringUtils.trimEnd("AZ", "[\\u{41}\\u{5A}]+"), "");
  assertStrictEquals(StringUtils.trimEnd("azAZ", "[\\u{41}\\u{5A}]+"), "az");

  assertStrictEquals(StringUtils.trimEnd("x x", HTTP_TAB_OR_SPACE), "x x");
  assertStrictEquals(StringUtils.trimEnd(" x", HTTP_TAB_OR_SPACE), " x");
  assertStrictEquals(StringUtils.trimEnd("x ", HTTP_TAB_OR_SPACE), "x");
});

Deno.test("StringUtils.segment(string, number)", () => {
  assertStrictEquals([...StringUtils.segment("", 2)].join(","), "");
  assertStrictEquals([...StringUtils.segment("abc", 2)].join(","), "ab,c");
  assertStrictEquals(
    [...StringUtils.segment("あいう", 2, "X")].join(","),
    "あい,うX",
  );
  assertStrictEquals(
    [...StringUtils.segment("あ\uD800\uDC00う", 2, "X")].join(","),
    "あ\uD800,\uDC00う",
  );
  assertStrictEquals(
    [...StringUtils.segment("あい\uD800\uDC00", 2, "X")].join(","),
    "あい,\uD800\uDC00",
  );

  //
  assertStrictEquals(
    [...StringUtils.segment("🤷🏽‍♀️", 2, "X")].join(","),
    "\u{d83e}\u{dd37},\u{d83c}\u{dffd},\u{200d}\u{2640},\u{fe0f}X",
  );

  assertThrows(
    () => {
      [...StringUtils.segment(1 as unknown as string, 0)];
    },
    TypeError,
    undefined,
    "input",
  );

  assertThrows(
    () => {
      [...StringUtils.segment("", 0)];
    },
    TypeError,
    undefined,
    "charCount",
  );

  assertStrictEquals(
    [...StringUtils.segment("\u{10000}\u{10001}\u{10002}", 2)].join(","),
    "\u{10000},\u{10001},\u{10002}",
  );
});

Deno.test("StringUtils.segment(string, number, string)", () => {
  assertStrictEquals([...StringUtils.segment("", 2, "X")].join(","), "");
  assertStrictEquals(
    [...StringUtils.segment("abc", 2, "X")].join(","),
    "ab,cX",
  );

  assertThrows(
    () => {
      [...StringUtils.segment("", 1, "")];
    },
    TypeError,
    undefined,
    "paddingChar",
  );

  assertThrows(
    () => {
      [...StringUtils.segment("", 1, "XX")];
    },
    TypeError,
    undefined,
    "paddingChar",
  );
});
