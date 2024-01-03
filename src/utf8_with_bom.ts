import { BOM, isString } from "./main.ts";

let _decoder: TextDecoder;
let _encoder: TextEncoder;

/** @deprecated */
export namespace Utf8WithBom {
  // preserve BOM
  export function decode(input: BufferSource = new Uint8Array(0)): string {
    if (!_decoder) {
      _decoder = new TextDecoder("utf-8", { fatal: true, ignoreBOM: true });
    }
    return _decoder.decode(input);
  }

  // prepend BOM if string does not start with BOM
  export function encode(input = ""): Uint8Array {
    if (isString(input) !== true) {
      throw new TypeError("input");
    }

    if (!_encoder) {
      _encoder = new TextEncoder();
    }

    if (input.startsWith(BOM)) {
      return _encoder.encode(input);
    }
    return _encoder.encode(BOM + input);
  }
}
