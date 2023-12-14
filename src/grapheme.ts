import { SafeInteger } from "../deps.ts";
import { isString } from "./string.ts";

type grapheme = string;
type graphemesequence = string;

let _segmenter: Intl.Segmenter | null = null;

function _toGraphemeArray(s: string): Array<Intl.SegmentData> {
  if (!_segmenter) {
    // 引数は省略する
    // - 第1引数: UAX#29 に言語は関係無いはず
    // - 第2引数: 省略時"grapheme"
    _segmenter = new Intl.Segmenter();
  }
  return [..._segmenter.segment(s)];
}

namespace Grapheme {
  export function isGrapheme(test: unknown): boolean {
    if (isString(test) !== true) {
      return false;
    }
    const graphemes = _toGraphemeArray(test as string);
    return (graphemes.length === 1);
  }

  export function* segment(
    input: graphemesequence,
    graphemeCount: SafeInteger,
    paddingGrapheme?: grapheme,
  ): Generator<string, void, void> {
    if (isString(input) !== true) {
      throw new TypeError("input");
    }
    if (SafeInteger.isPositive(graphemeCount) !== true) {
      throw new TypeError("graphemeCount");
    }
    const paddingIsString = isString(paddingGrapheme);
    if (paddingIsString === true) {
      if (isGrapheme(paddingGrapheme) !== true) {
        throw new TypeError("paddingGrapheme");
      }
    }

    const graphemes = _toGraphemeArray(input);
    for (let i = 0; i < graphemes.length; i = i + graphemeCount) {
      const s = graphemes.slice(i, i + graphemeCount).map((data) =>
        data.segment
      );
      const d = graphemeCount - s.length;

      let r = s.join("");
      if ((d > 0) && (paddingIsString === true)) {
        r = r + (paddingGrapheme as string).repeat(d);
      }
      yield r;
    }
  }
}

export { Grapheme };
