// ゲームの様々な判定を行うクラス
export class Referee {
  private _clickCount: number = 0;

  public incrementCount(): void {
    this._clickCount++;
  }

  get clickCount(): number {
    return this._clickCount;
  }

  public resetCount(): void {
    this._clickCount = 0;
  }
}
