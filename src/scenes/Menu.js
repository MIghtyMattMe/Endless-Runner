class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        this.load.image("Start", "./assets/Start.png");
        this.load.image("Credits", "./assets/Credits.png");
        this.load.image("Arrow", "./assets/Arrow.png");
        this.load.image("Title", "./assets/Title.png");
    }

    create() {
        //load images
        this.add.image(300, 100, 'Title');
        this.startButton = this.add.image(200, 300, 'Start');
        this.creditsButton = this.add.image(400, 300, 'Credits');
        this.pointer = this.add.image(this.startButton.x - 60, 300, 'Arrow');

        //load instruction text
        this.add.text(100, 350, "space to select/jump, and P to pause\nArrows keys to navigate menu (no credits right now)\n\nSlide + power/speed-up + score/clock to be added");

        //gaming keeps track of if we load Play or not
        this.gaming = true;

        //declare keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    }

    update() {
        if(keySPACE.isDown && this.gaming) {
            this.scene.start('playScene');
        } else if (keySPACE.isDown) {
            //go to credits (doesn't exist right now)
        }
        if(keyLEFT.isDown) {
            this.gaming = true;
            this.pointer.x = this.startButton.x - 60;
        }
        if(keyRIGHT.isDown) {
            this.gaming = false;
            this.pointer.x = this.creditsButton.x - 60;
        }
    }
}