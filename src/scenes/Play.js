class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image("pSprite", "./assets/player.png");
        this.load.image("ground", "./assets/ground.png");

        this.load.image("testObstacle1", "./assets/testObstacle1.png");
        this.load.image("testObstacle2", "./assets/testObstacle2.png");
        this.load.image("testObstacle3", "./assets/testObstacle3.png");
    }

    create() {

        //ground + player creation
        let ground = this.physics.add.sprite(game.config.width/2, game.config.height - borderPadding, "ground");
        ground.body.allowGravity = false;
        ground.setImmovable();
        let player = new Player(this, game.config.width/2, game.config.height - borderPadding - borderUISize - ground.height, "pSprite");
        player.setGravityY(100);

        this.physics.add.collider(player, ground);

        //makeing obstacles
        this.obs = this.physics.add.group()
        this.obj = [];
        this.generation();
    }

    update() {
        for (this.i = 0; this.i < this.obj.length; this.i++) {
            this.obj[this.i].setVelocityX(-150);
            if (this.obj[this.i].x <= 0) {
                this.dest = this.obj.splice(0, 1);
                for (this.j = 0; this.j < this.dest.length; this.j++) {
                    this.dest[this.j].destroy();
                }
            }
        }

    }

    generation() {
        this.clock = this.time.delayedCall(Phaser.Math.Between(1000, 1750), () => {
            this.objNum = Phaser.Math.Between(0, 3);
            if (this.objNum == 0) {
                this.obj.push(this.obs.create(640, 400, 'testObstacle1'));
            } else if (this.objNum == 1) {
                this.obj.push(this.obs.create(640, 400, 'testObstacle2'));
            } else if (this.objNum == 2) {
                this.obj.push(this.obs.create(640, 300, 'testObstacle3'));
            }
            this.generation();
        }, null, this);
    }
}