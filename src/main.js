let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            fps: 60
        }
    },
    scene: [Menu, Play, Credits]
}

let game = new Phaser.Game(config);

//UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
//keyboard vars
let keyLEFT, keyRIGHT, keySPACE, keyENTER, keyP, keyS;

//sprite
let player, monster, fade;

//audio
let music, menu_music, scene;
