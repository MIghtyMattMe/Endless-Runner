class GameOver extends Phaser.Scene {
    constructor() {
        super("gameOverScene");
    }

    preload() {
        this.load.image("Background", "./assets/background/bgTest.png");
        this.load.image("Back", "./assets/credits_back.png");

        //preload audio
        this.load.audio('bgm', './assets/audio/bgm.mp3');
    }

    create() {
        //load images
        let bgi = this.add.tileSprite(0, 0, 640, 480, 'Background').setOrigin(0, 0);
        let backi = this.add.image(320, 240, 'Back').setOrigin(0.5, 0.5);
        backi.alpha = 0.7;

        let txtGO = this.add.text(game.config.width/2 - 70, 180, "GAME OVER\n---------");
        let txtGO1 = this.add.text(game.config.width/2 - 60, 260, "Woke up at "+ timeH +":"+timeM);
        txtGO.setFontSize(30);

        //txt.font = '';

        //declare keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        keySPACE.on('down', (event) => {
            this.scene.start('menuScene');
        });
    }

    update() {
    }
}