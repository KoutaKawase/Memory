import { Card } from "./Card";

export class Deck {
  private _cardList: Card[];

  constructor() {
    this._cardList = [];
  }
  //単純にシャッフルせずデッキ内のカードを作成
  public init(): void {
    for (let i = 0; i < 15; i++) {
      this._cardList.push(new Card());
    }
  }

  get cardList(): Card[] {
    return this._cardList;
  }
}
