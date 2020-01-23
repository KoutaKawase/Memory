import { Card } from "./Card";

export class Deck {
  private _cardList: Card[];

  constructor() {
    this._cardList = [];
  }
  //単純にシャッフルせずデッキ内のカードを作成
  public init(scene: g.Scene): void {
    for (let i = 0; i < 15; i++) {
      const back = new g.Sprite({
        scene: scene,
        src: scene.assets["cardBack"] as g.ImageAsset
      });
      this._cardList.push(new Card(back));
    }
  }

  get cardList(): Card[] {
    return this._cardList;
  }
}
