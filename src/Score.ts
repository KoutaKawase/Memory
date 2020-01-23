export class Score {
  private _score: number;
  private _label: g.Label;
  static readonly labelX = 20;
  static readonly labelY = 15;

  set label(label: g.Label) {
    this._label = label;
  }

  get label(): g.Label {
    return this._label;
  }

  public createLabel(font: g.BitmapFont, scene: g.Scene): g.Label {
    return new g.Label({
      scene: scene,
      text: 0 + "Pt",
      fontSize: 20,
      font: font,
      x: Score.labelX,
      y: Score.labelY
    });
  }
}
