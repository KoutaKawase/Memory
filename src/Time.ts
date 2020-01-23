export class Time {
  private _limit: number;
  private _now: number;
  private labelX: number = g.game.width - 200;
  private labelY: number = 15;
  private _label: g.Label;

  constructor(limit: number) {
    this._limit = limit;
    this._now = this._limit;
  }

  set label(label: g.Label) {
    this._label = label;
  }

  get label(): g.Label {
    return this._label;
  }

  set limit(limit: number) {
    this._limit = limit;
  }

  set now(time: number) {
    this._now = time;
  }

  get now(): number {
    return this._now;
  }

  public createLabel(font: g.BitmapFont, scene: g.Scene): g.Label {
    return new g.Label({
      scene: scene,
      text: "TIME " + this._limit,
      fontSize: 20,
      font: font,
      x: this.labelX,
      y: this.labelY
    });
  }
}
