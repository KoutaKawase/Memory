export function createSprite(
  scene: g.Scene,
  assetID: string,
  x = 0,
  y = 0
): g.Sprite {
  return new g.Sprite({
    touchable: true,
    scene: scene,
    src: scene.assets[assetID] as g.ImageAsset,
    x: x,
    y: y
  });
}
