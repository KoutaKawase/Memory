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

  public handleClick(scene: g.Scene) {
    this.back.opacity = 0;
    this.back.modified();

    scene.setTimeout(() => {
      this.back.opacity = 1;
      this.back.modified();
    }, 1200);
  }

  get back(): g.Sprite {
    return this._back;
  }

  get surface(): g.Sprite {
    return this._surface;
  }
}
