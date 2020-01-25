export class Score {
  private _score: number;
  private _label: g.Label;
  static readonly labelX = 20;
  static readonly labelY = 15;
  //正解したときの入るポイント
  static readonly defaultPoint = 2000;

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
    //制限時間内に全て終わっていたら残り秒*100を加算する
    if (g.game.vars.gameState.allDone) {
      const rest: number = g.game.vars.gameState.restTime;
      return this._score + rest * 100;
    }
    return this._score;
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
