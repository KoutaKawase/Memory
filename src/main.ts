import { GameMainParameterObject, RPGAtsumaruWindow } from "./parameterObject";
import { Deck } from "./Deck";

declare const window: RPGAtsumaruWindow;

export function main(param: GameMainParameterObject): void {
  const scene = new g.Scene({
    game: g.game
  });
  let time = 60; // 制限時間
  if (param.sessionParameter.totalTimeLimit) {
    time = param.sessionParameter.totalTimeLimit; // セッションパラメータで制限時間が指定されたらその値を使用します
  }
  // 市場コンテンツのランキングモードでは、g.game.vars.gameState.score の値をスコアとして扱います
  g.game.vars.gameState = { score: 0 };
  scene.loaded.add(() => {
    //3*10で計30枚のカードのデッキを作成
    const deck = new Deck();
    //シャッフルして配置
    //プレイヤーが好きな二枚を選び裏を見る
    //同じ数字であればその二枚を画面から消し5000pt追加　異なる場合伏せてもう一度

    const updateHandler = () => {
      if (time <= 0) {
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
    };
    scene.update.add(updateHandler);
    // ここまでゲーム内容を記述します
  });
  g.game.pushScene(scene);
}
