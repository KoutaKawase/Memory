export class Card {
  private _back: g.Sprite;

  constructor(back: g.Sprite) {
    this._back = back;
  }

  get back(): g.Sprite {
    return this._back;
  }
}
