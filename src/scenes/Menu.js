class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        this.load.image("Start", "./assets/menu/start.png");
        this.load.image("Credits", "./assets/menu/credits.png");
        this.load.image("Arrow", "./assets/menu/Arrow.png");
        this.load.image("Title", "./assets/menu/Title.png");
        this.load.image("Background", "./assets/menu/menu_screen.png");

        //preload audio
        this.load.audio('bgm', './assets/audio/bgm.mp3');
        this.load.audio('move', './assets/audio/MoveCursor.wav');
        this.load.audio('select', './assets/audio/Select.wav');
    }

    create() {
        //load images
        this.bg = this.add.tileSprite(0, 0, 640, 480, 'Background').setOrigin(0, 0);
        this.add.image(300, 120, 'Title');
        this.startButton = this.add.image(200, 300, 'Start');
        this.creditsButton = this.add.image(450, 300, 'Credits');
        this.pointer = this.add.image(this.startButton.x - 80, 300, 'Arrow');

        //load sounds
        this.moveSFX = this.sound.add('move');
        this.selectSFX = this.sound.add('select');

        //load instruction text
        this.add.text(100, 350, "Use arrow keys to choose where to go and space to select");

        //gaming keeps track of if we load Play or not
        this.gaming = true;

        //declare keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);

        keySPACE.on('down', (event) => {
            //this.selectSFX.play();
        });
        keyRIGHT.on('down', (event) => {
            this.moveSFX.play();
        });
        keyLEFT.on('down', (event) => {
            this.moveSFX.play();
        });
    }

    update() {
        if(keySPACE.isDown && this.gaming) {
            this.scene.start('playScene');
        } else if (keySPACE.isDown) {
            //go to credits (doesn't exist right now)
        }
        if(keyLEFT.isDown) {
            this.gaming = true;
            this.pointer.x = this.startButton.x - 80;
        }
        if(keyRIGHT.isDown) {
            this.gaming = false;
            this.pointer.x = this.creditsButton.x - 80;
        }
    }
}