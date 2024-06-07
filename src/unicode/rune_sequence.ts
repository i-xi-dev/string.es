import { EMPTY,isNonEmptyString } from "../string.ts";
import { Rune } from "./rune.ts";

export class RuneSequence {
  readonly #runes: Array<Rune>;

  protected constructor(runes: Array<Rune>) {
    this.#runes = runes;
  }

  static fromString(source: string): RuneSequence {
    if (isNonEmptyString(source) !== true) {
      new RuneSequence([]);
    }
    // if (source.isWellFormed() !== true) { // Rune.fromStringで同等のチェックはしている
    //   throw new RangeError("source");
    // }
    return RuneSequence.fromRunes([...source].map((rune) => Rune.fromString(rune)));
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
