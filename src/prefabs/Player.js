class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture);

      scene.physics.add.existing(this);
      scene.add.existing(this);

      this.isJumping = false;
      this.jumpDisabled = false;
      this.exponential = 2
      this.xSpeed = -3;
    }


    update() {

      //jump check
      if(keySPACE.isDown && !this.isJumping && !this.jumpDisabled){
        //console.log("jump");
        this.isJumping = true;
        this.setVelocityY(-500);
      }
      if(this.body.touching.down && !this.jumpDisabled){
        this.isJumping = false;
      }

      //duck check
      if(keyD.isDown){
        this.angle = 90;
      }
      else{
        this.angle = 0;
      }
    }

}  
