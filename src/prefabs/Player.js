class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture);

      scene.physics.add.existing(this);
      scene.add.existing(this);

      this.isJumping = false;         //true if player is airborne
      this.jumpDisabled = false;
      this.exponential = 2
      this.xSpeed = -5;               //perpetual negative x velocity
      this.jumpForce = -510;          //negative velocity for jump
      this.gravityVal = 1400;         //gravity on player
    }


    update() {
      this.setSize(this.width, this.height);

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

      //duck check
      if(keyS.isDown && !this.isJumping && !this.jumpDisabled){
        this.isJumping = true;
      }
    }

}  
