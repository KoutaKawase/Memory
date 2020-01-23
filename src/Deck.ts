import { Card } from "./Card";
import { createSprite } from "./utils/SpriteFactory";
export class Deck {
  private _cardList: Card[];

  constructor() {
    this._cardList = [];
  }
  //単純にシャッフルせずデッキ内のカードを作成
  public init(scene: g.Scene): void {
    for (let i = 0; i < 15; i++) {
      const back: g.Sprite = createSprite(scene, "cardBack");
      const surfaceAssetID = "m" + (i + 1);
      const surface: g.Sprite = createSprite(scene, surfaceAssetID);
      this._cardList.push(new Card(back, surface));
    }
  }

  get cardList(): Card[] {
    return this._cardList;
  }
}
