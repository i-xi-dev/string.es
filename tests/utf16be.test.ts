import { assertStrictEquals, assertThrows } from "./deps.ts";
import { Utf16be, Utf8 } from "../mod.ts";

Deno.test("Utf16be.decode(BufferSource)", () => {
  // decode()
  assertStrictEquals(Utf16be.decode(), "");

  // decode(ArrayBuffer)
  assertStrictEquals(Utf16be.decode(new ArrayBuffer(0)), "");
  assertStrictEquals(
    Utf16be.decode(Uint8Array.of(0, 0x41, 0, 0x42, 0, 0x43, 0, 0x44).buffer),
    "ABCD",
  );

  // decode(Uint8Array)
  assertStrictEquals(Utf16be.decode(Uint8Array.of()), "");
  assertStrictEquals(
    Utf16be.decode(Uint8Array.of(0, 0x41, 0, 0x42, 0, 0x43, 0, 0x44)),
    "ABCD",
  );
  assertStrictEquals(
    Utf16be.decode(
      Uint8Array.of(0x30, 0x42, 0x30, 0x44, 0x30, 0x46),
    ),
    "あいう",
  );
  assertStrictEquals(
    Utf16be.decode(
      Uint8Array.of(
        0xFE,
        0xFF,
        0x30,
        0x42,
        0x30,
        0x44,
        0x30,
        0x46,
      ),
    ),
    "あいう",
  );
  assertStrictEquals(
    Utf16be.decode(
      Uint8Array.of(
        0x30,
        0x42,
        0xFE,
        0xFF,
        0x30,
        0x44,
        0x30,
        0x46,
      ),
    ),
    "あ\uFEFFいう",
  );

  assertThrows(
    () => {
      Utf16be.decode(Uint8Array.of(0xFF));
    },
    TypeError,
    //XXX "input",
  );

  // decode(any)
  assertThrows(
    () => {
      Utf16be.decode([] as unknown as Uint8Array);
    },
    TypeError,
    //XXX "input",
  );
});

Deno.test("Utf16be.decode(BufferSource, {})", () => {
  const op = { ignoreBOM: true } as const;

  // decode()
  assertStrictEquals(Utf16be.decode(undefined, op), "");

  // decode(ArrayBuffer)
  assertStrictEquals(Utf16be.decode(new ArrayBuffer(0), op), "");
  assertStrictEquals(
    Utf16be.decode(
      Uint8Array.of(0, 0x41, 0, 0x42, 0, 0x43, 0, 0x44).buffer,
      op,
    ),
    "ABCD",
  );

  // decode(Uint8Array)
  assertStrictEquals(Utf16be.decode(Uint8Array.of(), op), "");
  assertStrictEquals(
    Utf16be.decode(Uint8Array.of(0, 0x41, 0, 0x42, 0, 0x43, 0, 0x44), op),
    "ABCD",
  );
  assertStrictEquals(
    Utf16be.decode(
      Uint8Array.of(0x30, 0x42, 0x30, 0x44, 0x30, 0x46),
      op,
    ),
    "あいう",
  );
  assertStrictEquals(
    Utf16be.decode(
      Uint8Array.of(
        0xFE,
        0xFF,
        0x30,
        0x42,
        0x30,
        0x44,
        0x30,
        0x46,
      ),
      op,
    ),
    "\uFEFFあいう",
  );
  assertStrictEquals(
    Utf16be.decode(
      Uint8Array.of(
        0x30,
        0x42,
        0xFE,
        0xFF,
        0x30,
        0x44,
        0x30,
        0x46,
      ),
      op,
    ),
    "あ\uFEFFいう",
  );

  assertThrows(
    () => {
      Utf16be.decode(Uint8Array.of(0xFF), op);
    },
    TypeError,
    //XXX "input",
  );

  // decode(any)
  assertThrows(
    () => {
      Utf16be.decode([] as unknown as Uint8Array, op);
    },
    TypeError,
    //XXX "input",
  );
});

Deno.test("Utf16be.encode(string)", () => {
  // encode()
  assertStrictEquals(JSON.stringify([...Utf16be.encode()]), "[]");

  // encode(string)
  assertStrictEquals(JSON.stringify([...Utf16be.encode("")]), "[]");
  assertStrictEquals(
    JSON.stringify([...Utf16be.encode("ABCD")]),
    "[0,65,0,66,0,67,0,68]",
  );
  assertStrictEquals(
    JSON.stringify([...Utf16be.encode("\u0000\u00FF")]),
    "[0,0,0,255]",
  );
  assertStrictEquals(
    JSON.stringify([...Utf16be.encode("\u0100")]),
    "[1,0]",
  );

  assertStrictEquals(
    JSON.stringify([...Utf16be.encode("\uFEFFあいう")]),
    "[254,255,48,66,48,68,48,70]",
  );

  // encode(any)
  assertThrows(
    () => {
      Utf16be.encode(0 as unknown as string);
    },
    TypeError,
    "input",
  );
});

Deno.test("Utf16be.encode(string, {})", () => {
  const op = { prependBOM: true } as const;

  // encode()
  assertStrictEquals(
    JSON.stringify([...Utf16be.encode(undefined, op)]),
    "[254,255]",
  );

  // encode(string)
  assertStrictEquals(JSON.stringify([...Utf16be.encode("", op)]), "[254,255]");
  assertStrictEquals(
    JSON.stringify([...Utf16be.encode("ABCD", op)]),
    "[254,255,0,65,0,66,0,67,0,68]",
  );
  assertStrictEquals(
    JSON.stringify([...Utf16be.encode("\u0000\u00FF", op)]),
    "[254,255,0,0,0,255]",
  );
  assertStrictEquals(
    JSON.stringify([...Utf16be.encode("\u0100", op)]),
    "[254,255,1,0]",
  );

  assertStrictEquals(
    JSON.stringify([...Utf16be.encode("\uFEFFあいう", op)]),
    "[254,255,48,66,48,68,48,70]",
  );

  // encode(any)
  assertThrows(
    () => {
      Utf16be.encode(0 as unknown as string, op);
    },
    TypeError,
    "input",
  );
});
