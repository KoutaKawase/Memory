import { Referee } from "./Referee";

export class Card {
  private _back: g.Sprite;
  private _surface: g.Sprite;
  static readonly width = 63;
  static readonly height = 101;

  constructor(back: g.Sprite, surface: g.Sprite) {
    this._back = back;
    this._surface = surface;
  }

  public setPosition(x: number, y: number): void {
    this._back.x = x;
    this._back.y = y;
    this._surface.x = x;
    this._surface.y = y;
  }

  public handleClick(
    scene: g.Scene,
    group: g.E,
    referee: Referee,
    list: Card[]
  ) {
    referee.incrementCount();

    if (referee.clickCount === 2) {
      for (const card of list) {
        card.back.touchable = false;
        card.back.modified();
      }
    }
    this.back.opacity = 0;
    this.back.modified();

    scene.setTimeout(() => {
      this.back.opacity = 1;
      this.back.modified();
      for (const card of list) {
        card.back.touchable = true;
        card.back.modified();
        referee.resetCount();
      }
    }, 1350);
  }

  get back(): g.Sprite {
    return this._back;
  }

  get surface(): g.Sprite {
    return this._surface;
  }
}
