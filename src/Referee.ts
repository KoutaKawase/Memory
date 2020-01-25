import { Card } from "./Card";
import { Board } from "./Board";
// ゲームの様々な判定を行うクラス
export class Referee {
  private _clickCount: number = 0;
  private _choicedCard: Card[] = [];
  //連続性回数をカウントする
  private _continuousCurrentCount: number = 0;

  public incrementCount(): void {
    this._clickCount++;
  }

  get clickCount(): number {
    return this._clickCount;
  }

  get continuousCurrentCount(): number {
    return this._continuousCurrentCount;
  }

  set continuousCurrentCount(count: number) {
    this._continuousCurrentCount = count;
  }

  get choicedCard(): Card[] {
    return this._choicedCard;
  }

  public keepChoicedCard(card: Card): void {
    if (this._choicedCard.length < 2) {
      this._choicedCard.push(card);
    }
  }

  public resetCount(): void {
    this._clickCount = 0;
  }

  public resetChoicedCards(): void {
    if (this._choicedCard.length === 2) {
      this._choicedCard = [];
    }
  }

  public isAllDone(board: Board): boolean {
    return board.group.children.length === 0;
  }

  public checkSameCard(): boolean {
    const choiced = this._choicedCard;

    if (choiced.length === 2 && choiced[0].id === choiced[1].id) {
      return true;
    }
    return false;
  }
}
