class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image("pSprite", "./assets/player.png");
        this.load.image("ground", "./assets/ground.png");
        this.load.image("monster", "./assets/Monster.png");

        this.load.image("testObstacle1", "./assets/testObstacle1.png");
        this.load.image("testObstacle2", "./assets/testObstacle2.png");
        this.load.image("testObstacle3", "./assets/testObstacle3.png");
        this.load.image("SpeedUp", "./assets/SpeedUp.png");
    }

    create() {
        this.physics.world.setFPS(60);

        //init music
        music = this.sound.add('bgm');
        music.setLoop(true);
        //music.play('volume', {volume: 0.5});
        //music.play();

        //ground + player creation
        let ground = this.physics.add.sprite(game.config.width/2, game.config.height - borderPadding, "ground");
        ground.body.allowGravity = false;
        ground.setImmovable();
        player = new Player(this, game.config.width/1.25, game.config.height - borderPadding - borderUISize - ground.height, "pSprite");
        player.setGravityY(player.gravityVal);
        player.setVelocityX(player.xSpeed);

        //Monster creation
        let monster = this.physics.add.sprite(45, game.config.height - borderPadding - 80, "monster");

        //makeing obstacles & power ups
        this.obs = this.physics.add.group();
        this.spd = this.physics.add.group();
        this.obj = [];
        this.powerup = false;
        this.objXVelocity = -150;
        this.minTime = 1000;
        this.maxTime = 1750;
        this.t = 0;
        this.generation();

        //add colliders
        this.physics.add.collider(player, ground);
        this.physics.add.overlap(player, this.obs, this.trip, null, this);
        this.physics.add.overlap(player, this.spd, this.run, null, this);
        this.physics.add.overlap(player, monster, this.gameover, null, this);

        //jump and pause keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        //pause event
        keyP.on('down', (event) => {
            if (this.pause) {
                this.pause = false;
                music.mute = false;
                this.physics.enableUpdate();
            } else {
                this.pause = true;
                music.mute = true;
                this.physics.disableUpdate();
            }
        });
        this.pause = false

        //making the clock
        this.ClockTime = 600;
        this.hours = (String(Math.floor(this.ClockTime/60)).padStart(2, "0"));
        this.minutes = (String(this.ClockTime % 60).padStart(2, "0"));
        this.ClockScore = this.add.text(550, 30, this.hours + ":" + this.minutes);

    }

    update() {
        if (this.pause == false) {
            //independent clock update
            //++this.t;
            this.t += 5;
            if(this.t%60 == 0){
                this.ClockTime++;
            }
            console.log("updating");
            //console.log();

            //create and move obs
            for (this.i = 0; this.i < this.obj.length; this.i++) {
                if (this.obj[this.i].x <= 0) {
                    this.dest = this.obj.splice(0, 1);
                    for (this.j = 0; this.j < this.dest.length; this.j++) {
                        this.dest[this.j].destroy();
                    }
                }
            }
            for (this.i in this.spd.getChildren()) {
                if (this.i.x <= 0) {
                    this.i.destroy();
                    this.powerup = false;
                } 
            }
            //sprite update call
            player.update();
            if (this.ClockTime >= 780) {
                this.ClockTime = 60;
            }
            this.hours = (String(Math.floor(this.ClockTime/60)).padStart(2, "0"));
            this.minutes = (String(this.ClockTime % 60).padStart(2, "0"));
            this.ClockScore.text = (this.hours + ":" + this.minutes);

            //speeds up the game
            if(this.minutes == 30){
                this.objXVelocity--;
                if(this.minTime > 700){
                    this.minTime -= 5;
                    this.maxTime -= 10;
                    player.jumpForce -= 0.5;
                    player.gravityVal += 200;
                }
            }
            //console.log("gravity: " + player.gravityVal);
            //console.log("player jump: " + player.jumpForce);
            console.log("powerup active? : " + this.powerup);
        }
    }

    generation() {
        this.clock = this.time.delayedCall(Phaser.Math.Between(this.minTime, this.maxTime), () => {
            if (!this.pause) {
                let objNum = Phaser.Math.Between(0, 3);
                if (objNum == 0) {
                    this.obj.push(this.obs.create(670, 440, 'testObstacle1').setDepth(-1).setVelocityX(this.objXVelocity));
                } else if (objNum == 1) {
                    this.obj.push(this.obs.create(670, 435, 'testObstacle2').setDepth(-1).setVelocityX(this.objXVelocity));
                } else if (objNum == 2) {
                    this.obj.push(this.obs.create(670, 410, 'testObstacle3').setDepth(-1).setVelocityX(this.objXVelocity));
                }
                objNum = Phaser.Math.Between(0, 2);
                if (objNum == 0 && this.powerup == false) {
                    this.spd.create(750, 440, 'SpeedUp').setDepth(-1).setVelocityX(-150);
                    this.powerup = true;
                }
            }
            //this.ClockTime += 5;
            this.generation();
        }, null, this);
    }

    trip(){
        //trigger some collision animation
        player.setVelocityX(-100);
        player.jumpDisabled = true;
        this.time.delayedCall(500, () => {
            player.jumpDisabled = false;
            player.setVelocityX(player.xSpeed);
        }, null, this);
    }

    run(){
        //trigger some running animation
        player.setVelocityX(120);
        this.spd.clear(true, true);
        this.powerup = false
        this.time.delayedCall(300, () => {
            player.setVelocityX(player.xSpeed);
        }, null, this);
    }

    gameover() {
        //go back to main menu
        music.mute = true;
        this.scene.start('menuScene');
    }
}