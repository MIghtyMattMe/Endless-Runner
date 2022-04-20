class Obstacle extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame);
      scene.add.existing(this);
    }

    update() {
      this.x -= 0.75;
      if (this.x < 0) {
        return false;
      } else {
        return true;
      }
    }
}