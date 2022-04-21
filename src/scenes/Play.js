class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image("testObstacle1", "./assets/testObstacle1.png");
        this.load.image("testObstacle2", "./assets/testObstacle2.png");
        this.load.image("testObstacle3", "./assets/testObstacle3.png");
    }

    create() {
        this.obj = [];
        this.generation();
        this.physics.add.group() = obs
        //this.physics.world.setFPS(60)
    }

    update() {
        for (this.i = 0; this.i < this.obj.length; this.i++) {
            if (!this.obj[this.i].update()) {
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
                this.obj.push(new Obstacle(this, 640, 400, 'testObstacle1'));
            } else if (this.objNum == 1) {
                this.obj.push(new Obstacle(this, 640, 400, 'testObstacle2'));
            } else if (this.objNum == 2) {
                this.obj.push(new Obstacle(this, 640, 300, 'testObstacle3'));
            }
            this.generation();
        }, null, this);
    }
}