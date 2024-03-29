import { Score } from "./Score";
import { Referee } from "./Referee";
import { Board } from "./Board";
import { Time } from "./Time";

export class Card {
  private _back: g.Sprite;
  private _surface: g.Sprite;
  private _id: number;
  static readonly width = 63;
  static readonly height = 101;

  constructor(back: g.Sprite, surface: g.Sprite, id: number) {
    this._back = back;
    this._surface = surface;
    //カードのバリューを判断するために使うid m1なら1 m2なら2
    this._id = id;
  }

  get id(): number {
    return this._id;
  }

  public setPosition(x: number, y: number): void {
    this._back.x = x;
    this._back.y = y;
    this._surface.x = x;
    this._surface.y = y;
  }

  public handleClick(
    scene: g.Scene,
    referee: Referee,
    list: Card[],
    score: Score,
    board: Board,
    time: Time
  ) {
    referee.incrementCount();
    referee.keepChoicedCard(this);

    (scene.assets["select"] as g.AudioAsset).play();

    if (referee.clickCount === 2) {
      for (const card of list) {
        card.back.touchable = false;
        card.back.modified();
      }
    }

    //正解した時
    if (referee.clickCount === 2 && referee.checkSameCard()) {
      (scene.assets["ok"] as g.AudioAsset).play();
      score.addPoint(referee.continuousCurrentCount);
      list.forEach(card => {
        if (card.id === this._id) {
          card.back.destroy();
          card.back.modified();
          card.surface.destroy();
          card.surface.modified();
        }
      });
      if (referee.isAllDone(board)) {
        g.game.vars.gameState.allDone = true;
        //全て完了した時点での残り時間
        g.game.vars.gameState.restTime = Math.ceil(time.now);
        (scene.assets["allDone"] as g.AudioAsset).play();
      }
      referee.continuousCurrentCount += 1;
    }

    if (referee.clickCount === 2 && !referee.checkSameCard()) {
      referee.continuousCurrentCount = 0;
    }

    this.back.opacity = 0;
    //一度クリックした画像はもう押せないようにする
    this.back.touchable = false;
    this.back.modified();

    //二回目の時だけ元に戻す処理をする
    if (referee.clickCount === 2) {
      scene.setTimeout(() => {
        this.back.opacity = 1;
        this.back.modified();

        //１つめに選んだモノを元に戻す
        referee.choicedCard[0].back.opacity = 1;

        for (const card of list) {
          card.back.touchable = true;
          card.back.modified();
        }

        referee.resetChoicedCards();
        referee.resetCount();
      }, 500);
    }
  }

  get back(): g.Sprite {
    return this._back;
  }

  get surface(): g.Sprite {
    return this._surface;
  }
}
