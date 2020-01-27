import { GameMainParameterObject, RPGAtsumaruWindow } from "./parameterObject";
import { main } from "./main";
declare const window: RPGAtsumaruWindow;

export function introduce(param: GameMainParameterObject) {
  const scene = new g.Scene({
    game: g.game,
    assetIds: ["introduction", "ok"]
  });

  scene.loaded.add(() => {
    const sprite = new g.Sprite({
      scene: scene,
      src: scene.assets["introduction"],
      x: 100,
      y: 100
    });
    scene.append(sprite);
    scene.setTimeout(() => {
      g.game.replaceScene(main(param));
    }, 3000);
  });
  g.game.pushScene(scene);
}
