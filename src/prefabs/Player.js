class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture);

      scene.physics.add.existing(this);
      scene.add.existing(this);

      this.jump = false;
      this.exponential = 2
      this.xSpeed = -3;
    }


    update() {
      //jump check
      if(keySPACE.isDown && !this.jump){
        //console.log("jump");
        this.jump = true;
        this.setVelocityY(-500);
      }
      if(this.body.touching.down){
        this.jump = false;
      }

      //duck check
      if(keyD.isDown){
        this.flipX = true;
        console.log("flip");
      }
      else{
        this.flipX = false;
      }
    }

}  
