import { Card } from "./Card";
import { createSprite } from "./utils/SpriteFactory";
export class Deck {
  private _cardList: Card[];

  constructor() {
    this._cardList = [];
  }
  //単純にシャッフルせずデッキ内のカードを作成
  public init(scene: g.Scene): void {
    this._cardList = this.createFullDeck(scene);
  }

  private createFullDeck(scene: g.Scene): Card[] {
    const cardList: Card[] = [];
    //同じカードを二枚持った30枚構成にするために二回する
    for (let count = 0; count < 2; count++) {
      for (let i = 0; i < 15; i++) {
        const back: g.Sprite = createSprite(scene, "cardBack");
        const surfaceAssetID = "m" + (i + 1);
        const surface: g.Sprite = createSprite(scene, surfaceAssetID);
        //30枚にする必要があるので二回する
        cardList.push(new Card(back, surface));
      }
    }

    return cardList;
  }

  get cardList(): Card[] {
    return this._cardList;
  }
}
