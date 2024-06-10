import { EMPTY, isNonEmptyString } from "../string.ts";
import { Rune } from "./rune.ts";
import { SafeInteger } from "../../deps.ts";

export class RuneSequence {
  readonly #runes: Array<Rune>;

  private constructor(runes: Array<Rune>) {
    this.#runes = runes;
  }

  get charCount(): SafeInteger {
    return this.#runes.reduce(
      (accumulator: SafeInteger, currentValue: Rune) => {
        return accumulator + currentValue.charCount;
      },
      0,
    );
  }

  get runeCount(): SafeInteger {
    return this.#runes.length;
  }

  static fromString(source: string): RuneSequence {
    if (isNonEmptyString(source) !== true) {
      new RuneSequence([]);
    }
    // if (source.isWellFormed() !== true) { // Rune.fromStringで同等のチェックはしている
    //   throw new RangeError("source");
    // }
    return RuneSequence.fromRunes(
      [...source].map((rune) => Rune.fromString(rune)),
    );
  }

  static fromRunes(runes: Iterable<Rune>): RuneSequence {
    return new RuneSequence([...runes]);
  }

  toString(): string {
    return this.#runes.map((rune) => rune.toString()).join(EMPTY);
  }

  toRunes(): Array<Rune> {
    return this.#runes.map((rune) => Rune.fromCodePoint(rune.toCodePoint()));
  }
}
