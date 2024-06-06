import { Rune } from "./rune.ts";

export class GraphemeCluster {
  readonly #runes: Array<Rune>;

  private constructor(runes: Array<Rune>) {
    this.#runes = runes;
  }

}
