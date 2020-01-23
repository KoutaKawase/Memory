export class Card {
  private _back: g.Sprite;
  private _surface: g.Sprite;

  constructor(back: g.Sprite, surface: g.Sprite) {
    this._back = back;
    this._surface = surface;
  }

  get back(): g.Sprite {
    return this._back;
  }

  get surface(): g.Sprite {
    return this._surface;
  }
}
