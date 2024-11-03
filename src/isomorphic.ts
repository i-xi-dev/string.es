import { EMPTY } from "./char_sequence.ts";
import { StringType } from "../deps.ts";

/**
 * Implements [isomorphic decode](https://infra.spec.whatwg.org/#isomorphic-decode) defined in WHATWG Infra Standard.
 *
 * @param input A byte sequence.
 * @returns A string that represents a byte sequence by the code point.
 */
export function decode(input: BufferSource = new Uint8Array(0)): string {
  let bytes: Uint8Array;
  if (ArrayBuffer.isView(input)) {
    bytes = new Uint8Array(input.buffer);
  } else if (input instanceof ArrayBuffer) {
    bytes = new Uint8Array(input);
  } else {
    throw new TypeError("input");
  }

  // A: Bの2倍以上遅い（Node.js）
  // let chars: string = EMPTY;
  // for (const byte of bytes) {
  //   chars = chars + String.fromCharCode(byte);
  // }
  // return chars;

  // B:
  const chars = Array.from(bytes, (byte) => {
    return String.fromCharCode(byte);
  });
  return chars.join(EMPTY); //XXX +=の方が多分速い
}

/**
 * Implements [isomorphic encode](https://infra.spec.whatwg.org/#isomorphic-encode) defined in WHATWG Infra Standard.
 *
 * @param input A string that does not contain code points greater than `U+00FF`.
 * @returns A byte sequence of isomorphic encoded `input`.
 */
export function encode(input = EMPTY): Uint8Array {
  StringType.assertString(input, "input");

  // deno-lint-ignore no-control-regex
  if (/^[\u{0}-\u{FF}]*$/u.test(input) !== true) {
    throw new RangeError("input");
  }

  const bytes = new Uint8Array(input.length);
  for (let i = 0; i < input.length; i++) {
    bytes[i] = input.charCodeAt(i);
  }
  return bytes;
}
