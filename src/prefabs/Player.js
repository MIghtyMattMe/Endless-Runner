class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture);

      scene.physics.add.existing(this);
      scene.add.existing(this);

      this.isJumping = false;         //true if player is airborne
      this.jumpDisabled = false;
      this.exponential = 2
      this.xSpeed = -5;               //perpetual negative x velocity
      this.jumpForce = -500;          //negative velocity for jump
      this.gravityVal = 1400;         //gravity on player
    }


    update() {

      //jump check
      if(keySPACE.isDown && !this.isJumping && !this.jumpDisabled){
        //console.log("jump");
        this.isJumping = true;
        this.anims.play("jump", true);
        this.setVelocityY(this.jumpForce);
      }
      if(this.body.touching.down && !this.jumpDisabled){
        this.isJumping = false;
      }

      if(this.body.touching.down){
        this.anims.play("running", true);
      }

      //duck check
      if(keyD.isDown){
        //this.angle = 90;
        this.setVelocityY(-30);
        this.anims.play('slide', true);
      }
      else{
        //this.angle = 0;
      }
    }

}  
