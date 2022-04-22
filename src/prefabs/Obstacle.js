class Obstacle extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame);
      scene.physics.add.existing(this);
      scene.add.existing(this);
    }

    update() {
      this.setVelocityX(-100);
      if (this.x < 0) {
        return false;
      } else {
        return true;
      }
    }
}