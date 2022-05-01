class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        //this.load.image("pSprite", "./assets/player.png");
        this.load.atlas("pSprite", "./assets/player/player.png", "./assets/player/playerSprites.json");
        this.load.image("ground", "./assets/ground.png");
        //this.load.image("monster", "./assets/Monster.png");
        this.load.atlas("monster", "./assets/monster/blob.png", "./assets/monster/blobSprite.json");

        this.load.image("testObstacle1", "./assets/testObstacle1.png");
        this.load.image("testObstacle2", "./assets/testObstacle2.png");
        this.load.image("testObstacle3", "./assets/testObstacle3.png");
        this.load.image("SpeedUp", "./assets/SpeedUp.png");

        this.load.audio('Pause', './assets/audio/Pause.wav');
        this.load.audio('Jump', './assets/audio/Jump.wav');
        this.load.audio('Trip', './assets/audio/Trip.wav');
        this.load.audio('Slide', './assets/audio/Slide.wav');

        this.load.image("background001", "./assets/background/background001.png");
        this.load.image("background002", "./assets/background/background002.png");
        this.load.image("background003", "./assets/background/background003.png");
        this.load.image("background004", "./assets/background/background004.png");
        this.load.image("background005", "./assets/background/background005.png");
        this.load.image("background006", "./assets/background/background006.png");
    }

    create() {
        this.physics.world.setFPS(60);

        //init music
        music = this.sound.add('bgm', {volume: 0.5});
        music.setLoop(true);
        //music.play();
        //music.play();

        //init sound effects
        this.jumpSFX = this.sound.add('Jump');
        this.pauseSFX = this.sound.add('Pause');
        this.slideSFX = this.sound.add('Slide');
        this.tripSFX = this.sound.add('Trip');

        //background creation
        this.background1 = this.physics.add.sprite(0, 0, 'background001').setOrigin(0, 0);
        this.background2 = this.physics.add.sprite(0, 0, 'background002').setOrigin(0, 0);
        this.background3 = this.physics.add.sprite(0, 0, 'background003').setOrigin(0, 0);
        this.background4 = this.physics.add.sprite(0, 0, 'background004').setOrigin(0, 0);
        this.background5 = this.physics.add.sprite(0, 0, 'background005').setOrigin(0, 0);
        this.background6 = this.physics.add.sprite(0, 0, 'background006').setOrigin(0, 0);

        //ground + player creation
        let ground = this.physics.add.sprite(game.config.width/2, game.config.height - borderPadding * 10, "ground").setDepth(-1);
        ground.body.allowGravity = false;
        ground.setImmovable();
        this.anims.create({key: "running", frames: this.anims.generateFrameNames('pSprite', {prefix: 'walk', end: 1, zeroPad:2}), frameRate: 20, repeat: -1});
        this.anims.create({key: "jump", frames: this.anims.generateFrameNames('pSprite', {prefix: 'jump', end: 0, zeroPad:1}), repeat: -1});
        this.anims.create({key: "slide", frames: this.anims.generateFrameNames('pSprite', {prefix: 'slide', end: 0, zeroPad:1}), repeat: -1});
        player = new Player(this, game.config.width/1.25, game.config.height - borderPadding * 10 - ground.height, "pSprite").setDepth(1);
        player.setGravityY(player.gravityVal);
        player.setVelocityX(player.xSpeed);

        //Monster creation
        this.anims.create({key: 'monsterMovement', frames: this.anims.generateFrameNames('monster', {prefix: 'blob', end: 19, zeroPad:3}), frameRate: 20, repeat: -1});
        monster = this.physics.add.sprite(70, player.y, "monster");//.setDepth(1);

        //makeing obstacles & power ups
        this.obs = this.physics.add.group();
        this.spd = this.physics.add.group();
        this.obj = [];
        this.powers = [];
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

        //play jump/slide sound
        keySPACE.on('down', (event) => {
            this.jumpSFX.play();
        });
        keyD.on('down', (event) => {
            this.slideSFX.play();
        });
        //pause event
        keyP.on('down', (event) => {
            if (this.pause) {
                this.pause = false;
                music.resume();
                //music.mute = false;
                this.pauseSFX.play();
                this.physics.enableUpdate();
            } else {
                this.pause = true;
                music.pause();
                //music.mute = true;
                this.pauseSFX.play();
                this.physics.disableUpdate();
            }
        });
        this.pause = false

        //making the clock
        this.ClockTime = 600;
        this.hours = (String(Math.floor(this.ClockTime/60)).padStart(2, "0"));
        this.minutes = (String(this.ClockTime % 60).padStart(2, "0"));
        this.ClockScore = this.add.text(550, 30, this.hours + ":" + this.minutes);
        this.gameup = false;

    }

    update() {
        if (this.pause == false) {
            //move background
            this.background1.setVelocityX(this.objXVelocity * 0.2);
            this.background2.setVelocityX(this.objXVelocity * 0.4);
            this.background3.setVelocityX(this.objXVelocity * 0.6);
            this.background4.setVelocityX(this.objXVelocity * 0.8);
            this.background5.setVelocityX(this.objXVelocity);
            this.background6.setVelocityX(this.objXVelocity);
            if (this.background1.x <= -960) {
                this.background1.x = 0;
            }
            if (this.background2.x <= -960) {
                this.background2.x = 0;
            }
            if (this.background3.x <= -960) {
                this.background3.x = 0;
            }
            if (this.background4.x <= -960) {
                this.background4.x = 0;
            }
            if (this.background5.x <= -960) {
                this.background5.x = 0;
                this.background6.x = 0;
            }

            //independent clock update
            this.t += 0.5;
            //this.t += 5;
            if(this.t%60 == 0){
                this.ClockTime++;
            }

            //create and move obs
            for (this.i = 0; this.i < this.obj.length; this.i++) {
                this.obj[this.i].setVelocityX(this.objXVelocity);
                if (this.obj[this.i].x <= 0) {
                    this.dest = this.obj.splice(0, 1);
                    for (this.j = 0; this.j < this.dest.length; this.j++) {
                        this.dest[this.j].destroy();
                    }
                }
            }
            for (this.i = 0; this.i < this.powers.length; this.i++) {
                this.powers[this.i].setVelocityX(this.objXVelocity)
                if (this.powers[this.i].x <= 0) {
                    this.dest = this.powers.splice(0, 1);
                    for (this.j = 0; this.j < this.dest.length; this.j++) {
                        this.dest[this.j].destroy();
                    }
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

            //monster animation
            monster.anims.play("monsterMovement", true);

            //speeds up the game
            if((this.minutes == 30) && (!this.gameup)){
                this.gameup = true;
                if(this.minTime > 500){
                    this.objXVelocity -= 40;
                    this.minTime -= 110;
                    this.maxTime -= 220;
                    player.jumpForce -= 0.5;
                    player.gravityVal += 200;
                }
                this.clock = this.time.delayedCall(500, () => {
                    this.gameup = false;
                });
            }
        }
    }

    generation() {
        this.clock = this.time.delayedCall(Phaser.Math.Between(this.minTime, this.maxTime), () => {
            if (!this.pause) {
                let objNum = Phaser.Math.Between(0, 3);
                if (objNum == 0) {
                    this.obj.push(this.obs.create(670, game.config.height - borderPadding*10, 'testObstacle1'));
                } else if (objNum == 1) {
                    this.obj.push(this.obs.create(670, 412, 'testObstacle2'));
                } else if (objNum == 2) {
                    this.obj.push(this.obs.create(670, 412 - 25, 'testObstacle3'));
                }
                objNum = Phaser.Math.Between(0, 2);
                if (objNum == 0 && this.powerup == false) {
                    this.powers.push(this.spd.create(750, 412, 'SpeedUp'));
                    this.powerup = true;
                }
            }
            this.generation();
        }, null, this);
    }

    trip(){
        //trigger some collision animation
        player.setVelocityX(-100);
        player.jumpDisabled = true;
        if (!this.tripSFX.isPlaying) {
            this.tripSFX.play();
        }
        this.time.delayedCall(500, () => {
            player.jumpDisabled = false;
            player.setVelocityX(player.xSpeed);
        }, null, this);
    }

    run(){
        //trigger some running animation
        player.setVelocityX(120);
        this.powers.pop().destroy();
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