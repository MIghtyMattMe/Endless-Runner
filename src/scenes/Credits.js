class Credits extends Phaser.Scene {
    constructor() {
        super("creditsScene");
    }

    preload() {
        this.load.image("Background", "./assets/menu/menu_screen.png");
        this.load.image("Back", "./assets/credits_back.png");

        //preload audio
        this.load.audio('bgm', './assets/audio/bgm.mp3');
    }

    create() {
        //load images
        let bg = this.add.tileSprite(0, 0, 640, 480, 'Background').setOrigin(0, 0);
        let back = this.add.image(320, 240, 'Back').setOrigin(0.5, 0.5);
        back.alpha = 0.7;

        let txt = this.add.text(120, 140, "This game was made as a part of UC Santa \nCruz classes ARTG 120 and CMPM 120.\n\nArtists:\n\tZoey Laytart\n\tRoman Collazo\n\tMichelle Kim\n\nProgrammers:\n\tMatthew Meacham\n\tMichelle Kim\n\nPress the space bar to go back to the menu.");
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