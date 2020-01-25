export class Score {
  private _score: number;
  private _label: g.Label;
  static readonly labelX = 20;
  static readonly labelY = 15;
  //正解したときの入るポイント
  static readonly defaultPoint = 3000;

  constructor(score: number) {
    this._score = score;
  }

  get score(): number {
    return this._score;
  }

  public addPoint(currentCount: number): void {
    if (currentCount > 0) {
      //連続正解１回なら1.1倍 二回なら1.2倍にする
      this._score += Score.defaultPoint * (1 + currentCount / 10);
      return;
    }
    this._score += Score.defaultPoint;
  }

  public calcFinalScore(): number {
    return this._score * 10;
  }

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
