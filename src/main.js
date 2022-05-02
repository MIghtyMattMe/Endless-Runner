/*
Nightmare Runner
Completed - 5/1/2022

Made by:
Roman Collazo
Michelle Kim
Zoey Laytart
Matthew Meacham

Creative Tilt!

Coding wise, some of the interesting things our team made mainly revolves around
how the game speeds up over time. Basically we made a public variable for velocity
that all physic objects used and would slowy increment it over time. This time was
measued via an ingame clock that we made. 
This clock also functions as a score of sorts with the main goal being how late the
player can stay up . This then ties in with the art creative tilt.

The game's art/mechanics tell of a nightmare. This can be seen through the menu's
background and the use of a digital clock for keeping score. Additionally the player 
is constantly moving backwards, to simulate how in a nightmare you never seem to run 
fast enough. 
*/
let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            fps: 60
        }
    },
    scene: [Menu, Play, Credits, GameOver]
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

//random
let timeH, timeM;
