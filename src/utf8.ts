import { BOM, isString } from "./main.ts";

let _decoderDiscardBOM: TextDecoder;
let _decoderPreserveBOM: TextDecoder;
let _encoder: TextEncoder;

export namespace Utf8 {
  export type DecodeOptions = {
    ignoreBOM?: boolean;
  };

  export function decode(
    input: BufferSource = new Uint8Array(0),
    options: DecodeOptions = {},
  ): string {
    let _decoder: TextDecoder;
    if (options?.ignoreBOM === true) {
      // preserve BOM
      if (!_decoderPreserveBOM) {
        _decoderPreserveBOM = new TextDecoder("utf-8", {
          fatal: true,
          ignoreBOM: true,
        });
      }
      _decoder = _decoderPreserveBOM;
    } else {
      // discard BOM
      if (!_decoderDiscardBOM) {
        _decoderDiscardBOM = new TextDecoder("utf-8", {
          fatal: true,
          ignoreBOM: false,
        });
      }
      _decoder = _decoderDiscardBOM;
    }

    return _decoder.decode(input);
  }

  export type EncodeOptions = {
    prependBom?: boolean;
  };

  // does not prepend BOM
  export function encode(input = "", options: EncodeOptions = {}): Uint8Array {
    if (isString(input) !== true) {
      throw new TypeError("input");
    }

    if (!_encoder) {
      _encoder = new TextEncoder();
    }

    if (options?.prependBom === true) {
      if (input.startsWith(BOM) !== true) {
        return _encoder.encode(BOM + input);
      }
    }
    return _encoder.encode(input);
  }
}
