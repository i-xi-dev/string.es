import { isString } from "./main.ts";

let _decoder: TextDecoder;
let _encoder: TextEncoder;

export namespace Utf8 {
  export function decode(input: BufferSource = new Uint8Array(0)): string {
    if (!_decoder) {
      // discard BOM
      _decoder = new TextDecoder("utf-8", { fatal: true, ignoreBOM: false });
    }
    return _decoder.decode(input);
  }

  //XXX options discardBom
  export function encode(input = ""): Uint8Array {
    if (isString(input) !== true) {
      throw new TypeError("input");
    }

    if (!_encoder) {
      _encoder = new TextEncoder();
    }
    return _encoder.encode(input);
  }
}
