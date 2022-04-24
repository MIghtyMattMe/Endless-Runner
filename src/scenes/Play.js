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
    }

    create() {
        this.physics.world.setFPS(60);

        //ground + player creation
        let ground = this.physics.add.sprite(game.config.width/2, game.config.height - borderPadding, "ground");
        ground.body.allowGravity = false;
        ground.setImmovable();
        player = new Player(this, game.config.width/1.25, game.config.height - borderPadding - borderUISize - ground.height, "pSprite");
        player.setGravityY(1200);
        player.setVelocityX(player.xSpeed);
        this.playerVelocity = new Phaser.Math.Vector2(0,0);

        //Monster creation
        let monster = this.physics.add.sprite(45, game.config.height - borderPadding - 80, "monster");

        //makeing obstacles
        this.obs = this.physics.add.group();
        this.obj = [];
        this.generation();

        //add colliders
        this.physics.add.collider(player, ground);
        this.physics.add.overlap(player, this.obs, this.trip, null, this);
        this.physics.add.overlap(player, monster, this.gameover, null, this);

        //jump and pause keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);

        //pause event
        keyP.on('down', (event) => {
            if (this.pause) {
                this.pause = false;
                player.setGravityY(1200);
                player.body.velocity = this.playerVelocity;
            } else {
                this.pause = true;
                for (this.i = 0; this.i < this.obj.length; this.i++) {
                    this.obj[this.i].setVelocityX(0);
                }
                this.playerVelocity = player.body.velocity.clone();
                player.setGravityY(0);
                player.setVelocityY(0);
                player.setVelocityX(0);
            }
        });
        this.pause = false


    }

    update() {
        if (this.pause == false) {
            //create and move obs
            for (this.i = 0; this.i < this.obj.length; this.i++) {
                this.obj[this.i].setVelocityX(-150);
                if (this.obj[this.i].x <= 0) {
                    this.dest = this.obj.splice(0, 1);
                    for (this.j = 0; this.j < this.dest.length; this.j++) {
                        this.dest[this.j].destroy();
                    }
                }
            }
            //sprite update call
            player.update();
        }
    }

    generation() {
        this.clock = this.time.delayedCall(Phaser.Math.Between(1000, 1750), () => {
            if (!this.pause) {
                this.objNum = Phaser.Math.Between(0, 3);
                if (this.objNum == 0) {
                    this.obj.push(this.obs.create(670, 440, 'testObstacle1').setDepth(-1));
                } else if (this.objNum == 1) {
                    this.obj.push(this.obs.create(670, 435, 'testObstacle2').setDepth(-1));
                } else if (this.objNum == 2) {
                    this.obj.push(this.obs.create(670, 410, 'testObstacle3').setDepth(-1));
                }
            }
            this.generation();
        }, null, this);
    }

    trip(){
        //trigger some collision animation
        player.setVelocityX(-80);
        this.time.delayedCall(1000, () => {
            player.setVelocity(player.xSpeed);
        }, null, this);
    }

    gameover() {
        //go back to main menu
        this.scene.start('menuScene');
    }
}