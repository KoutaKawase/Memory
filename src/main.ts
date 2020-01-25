import { GameMainParameterObject, RPGAtsumaruWindow } from "./parameterObject";
import { Deck } from "./Deck";
import { Board } from "./Board";
import { Referee } from "./Referee";
import { Score } from "./Score";
import { Time } from "./Time";
import { createLabel } from "./utils/LebelFactory";

declare const window: RPGAtsumaruWindow;

export function main(param: GameMainParameterObject): void {
  const scene = new g.Scene({
    game: g.game,
    assetIds: [
      "m1",
      "m2",
      "m3",
      "m4",
      "m5",
      "m6",
      "m7",
      "m8",
      "m9",
      "m10",
      "m11",
      "m12",
      "m13",
      "m14",
      "m15",
      "cardBack",
      "bmpPng",
      "glyph"
    ]
  });

  g.game.vars.gameState = { score: 0 };
  const score = new Score(g.game.vars.gameState.score);
  const time = new Time(100);

  if (param.sessionParameter.totalTimeLimit) {
    time.limit = param.sessionParameter.totalTimeLimit; // セッションパラメータで制限時間が指定されたらその値を使用します
  }

  scene.loaded.add(() => {
    //3*10で計30枚のカードのデッキを作成
    const deck = new Deck();
    deck.init(scene);
    //シャッフルして配置
    deck.shuffle();
    deck.calclateCardsPosition();

    const font = new g.BitmapFont({
      src: scene.assets["bmpPng"],
      map: JSON.parse((scene.assets["glyph"] as g.TextAsset).data),
      defaultGlyphWidth: 16,
      defaultGlyphHeight: 16
    });

    time.label = time.createLabel(font, scene);
    score.label = score.createLabel(font, scene);

    scene.append(time.label);
    scene.append(score.label);

    const board = new Board(new g.E({ scene: scene, y: Board.posY }));

    //全てのカードバックをグループに入れ
    for (const card of deck.cardList) {
      board.group.append(card.surface);
      board.group.append(card.back);
    }

    const referee = new Referee();

    //全てのカードにクリックハンドラ設定
    for (const card of deck.cardList) {
      card.back.pointDown.add(() => {
        card.handleClick(scene, referee, deck.cardList, score);
      });
    }

    scene.append(board.group);

    const updateHandler = () => {
      if (time.now <= 0) {
        for (const card of deck.cardList) {
          card.back.touchable = false;
          card.back.modified();
        }

        // RPGアツマール環境であればランキングを表示します
        if (param.isAtsumaru) {
          const boardId = 1;
          window.RPGAtsumaru.experimental.scoreboards
            .setRecord(boardId, g.game.vars.gameState.score)
            .then(function() {
              window.RPGAtsumaru.experimental.scoreboards.display(boardId);
            });
        }
        scene.update.remove(updateHandler); // カウントダウンを止めるためにこのイベントハンドラを削除します
      }

      time.now -= 1 / g.game.fps;
      time.label.text = "TIME " + Math.ceil(time.now);
      time.label.invalidate();

      score.label.text = score.score + "Pt";
      score.label.invalidate();
    };
    scene.update.add(updateHandler);
    // ここまでゲーム内容を記述します
  });
  g.game.pushScene(scene);
}
