import { BOM, isString } from "./main.ts";
import { Encoding } from "./encoding.ts";

let _decoderDiscardBOM: TextDecoder;
let _decoderPreserveBOM: TextDecoder;

export namespace Utf16be {
  export function decode(
    input: BufferSource = new Uint8Array(0),
    options: Encoding.DecodeOptions = {},
  ): string {
    let _decoder: TextDecoder;
    if (options?.ignoreBOM === true) {
      // preserve BOM
      if (!_decoderPreserveBOM) {
        _decoderPreserveBOM = new TextDecoder("utf-16be", {
          fatal: true,
          ignoreBOM: true,
        });
      }
      _decoder = _decoderPreserveBOM;
    } else {
      // discard BOM
      if (!_decoderDiscardBOM) {
        _decoderDiscardBOM = new TextDecoder("utf-16be", {
          fatal: true,
          ignoreBOM: false,
        });
      }
      _decoder = _decoderDiscardBOM;
    }

    return _decoder.decode(input);
  }

  export function encode(
    input = "",
    options: Encoding.EncodeOptions = {},
  ): Uint8Array {
    if (isString(input) !== true) {
      throw new TypeError("input");
    }

    let src = input;
    if (options?.prependBOM === true) {
      if (src.startsWith(BOM) !== true) {
        src = BOM + src;
      }
    }

    const buffer = new ArrayBuffer(src.length * 2);
    const view = new DataView(buffer);
    for (let i = 0; i < src.length; i++) {
      view.setUint16(i * 2, src.charCodeAt(i), false);
    }
    return new Uint8Array(buffer);
  }
}
