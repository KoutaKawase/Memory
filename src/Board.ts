import { Card } from "./Card";
import { Deck } from "./Deck";

export class Board {
  static readonly rowLength = Card.width * 10;
  static readonly colLength = Card.height * 3;
  static readonly posY = 49;
  private _group: g.E;

  constructor(group: g.E) {
    this._group = group;
  }

  get group(): g.E {
    return this._group;
  }
}
