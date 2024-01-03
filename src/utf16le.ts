import { BOM, isString } from "./main.ts";
import { Encoding } from "./encoding.ts";

const _LABEL = "utf-16le";

let _decoderDiscardBOM: TextDecoder;
let _decoderPreserveBOM: TextDecoder;

export namespace Utf16le {
  export function decode(
    input: BufferSource = new Uint8Array(0),
    options: Encoding.DecodeOptions = {},
  ): string {
    let _decoder: TextDecoder;
    if (options?.ignoreBOM === true) {
      // preserve BOM
      if (!_decoderPreserveBOM) {
        _decoderPreserveBOM = new TextDecoder(_LABEL, {
          fatal: true,
          ignoreBOM: true,
        });
      }
      _decoder = _decoderPreserveBOM;
    } else {
      // discard BOM
      if (!_decoderDiscardBOM) {
        _decoderDiscardBOM = new TextDecoder(_LABEL, {
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

    const bytesPerElement = Uint16Array.BYTES_PER_ELEMENT;
    const buffer = new ArrayBuffer(src.length * bytesPerElement);
    const view = new DataView(buffer);
    for (let i = 0; i < src.length; i++) {
      view.setUint16(i * bytesPerElement, src.charCodeAt(i), true);
    }
    return new Uint8Array(buffer);
  }
}
