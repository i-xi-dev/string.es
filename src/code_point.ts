type codepoint = number;

// 0～16 0はBMP
type plane = number;

export const MIN_VALUE = 0x0;

export const MAX_VALUE = 0x10FFFF;

const _MIN_HIGH_SURROGATE = 0xD800;
const _MAX_HIGH_SURROGATE = 0xDBFF;
const _MIN_LOW_SURROGATE = 0xDC00;
const _MAX_LOW_SURROGATE = 0xDFFF;

export function isCodePoint(test: unknown): test is codepoint {
  return Number.isSafeInteger(test) && ((test as number) >= MIN_VALUE) &&
    ((test as number) <= MAX_VALUE);
}

function _assertCodePoint(codePoint: unknown): void {
  if (isCodePoint(codePoint) !== true) {
    throw new TypeError("`codePoint` must be a code point.");
  }
}

export function toString(codePoint: codepoint): string {
  _assertCodePoint(codePoint);
  return `U+${codePoint.toString(16).toUpperCase().padStart(4, "0")}`;
}

export function planeOf(codePoint: codepoint): plane {
  _assertCodePoint(codePoint);
  return Math.trunc(codePoint / 0x10000) as plane;
}

export function isBmp(codePoint: codepoint): boolean {
  //return (planeOf(codePoint) === _BMP);

  _assertCodePoint(codePoint);
  return (codePoint < 0x10000);
}

export function isHighSurrogate(codePoint: codepoint): boolean {
  _assertCodePoint(codePoint);
  return (codePoint >= _MIN_HIGH_SURROGATE) &&
    (codePoint <= _MAX_HIGH_SURROGATE);
}

export function isLowSurrogate(codePoint: codepoint): boolean {
  _assertCodePoint(codePoint);
  return (codePoint >= _MIN_LOW_SURROGATE) && (codePoint <= _MAX_LOW_SURROGATE);
}

export function isSurrogate(codePoint: codepoint): boolean {
  _assertCodePoint(codePoint);
  return (codePoint >= _MIN_HIGH_SURROGATE) &&
    (codePoint <= _MAX_LOW_SURROGATE);
}

//TODO
// export function isVariationSelector(codePoint: codepoint): boolean {
//   _assertCodePoint(codePoint);
//   return inRanges(codePoint, _VSS, _checked);
// }
