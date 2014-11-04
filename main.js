/*global $, Crafty*/
 
var levelBitMap = [];
 
(function () {
    "use strict";
 
    //define a sprite size
    var spriteSize = 20,
        speed = 1.6;
 
    function initializeGame(width, height) {
 
        //initialize our game.  We give it width, height, and the html element to pput the game in
        Crafty.init(width * spriteSize, height * spriteSize, document.getElementById('game'));
 
        //set the background color to black
        Crafty.background("#000000");
 
        //load our sprites
        Crafty.sprite(spriteSize, "imgs/pacman20.png", {
            wall: [13, 3],
            pacman: [12, 0],
            ghost: [0, 0],
            pellet: [14, 1],
            powerUp: [15, 0],
            blinky: [0, 0],
            inky: [6, 0],
            pinky: [4, 0],
            clyde: [2, 0],
            lives: [16, 0],
            cherry: [16, 0]
        });
 
        //load audio files
        Crafty.audio.add({
            munch: ['sounds/munch.wav']
        });
    }
 
    function loadMap(file) {
 
        //get the level map file
        $.get(file, function (levelMap) {
 
            //split file into lines
            var lines = levelMap.split("\n");
 
            //call initializeGame
            
            //for windows
            if (navigator.appVersion.indexOf('Windows') > -1) {
                 initializeGame(lines[0].length-1, lines.length);
            }else{//for non windows
                 initializeGame(lines[0].length, lines.length);
            }
 
            //loop over each line
            $.each(lines, function (y, line) {
 
                var characters = line.split(""),
                    bitmap = $.map(characters, function (char) {
                        if (char === 'W') {
                            return 1;
                        } else if (char === 'G') {
                            return 2;
                        }
                        return 0;
                    });
                levelBitMap.push(bitmap);
 
                //split each line into characters and loop over each character
                $.each(characters, function (x, char) {
 
                    //set the x and y coordinates for the current item
                    var xCoord = x * spriteSize,
                        yCoord = y * spriteSize;
 
                    //match and create the appropriate entity
                    if (char === 'W') {
                        Crafty.e("Wall").create(xCoord, yCoord);
                    } else if (char === 'Z') {
                        Crafty.e("Score");
                    } else if (char === 'X') {
                        Crafty.e("Lives");
                    } else if (char === 'p') {
                        Crafty.e("Pellet").create(xCoord, yCoord);
                    } else if (char === 'S') {
                        Crafty.e("PowerUp").create(xCoord, yCoord);
                    } else if (char === 'M') {
                        Crafty.e("Pacman").create(xCoord, yCoord);
                    } else if (char === 'B') {
                        Crafty.e("Ghost").create(xCoord, yCoord, speed).setAI("Blinky");
                    } else if (char === 'I') {
                        Crafty.e("Ghost").create(xCoord, yCoord, speed).setAI("Inky");
                    } else if (char === 'P') {
                        Crafty.e("Ghost").create(xCoord, yCoord, speed).setAI("Pinky");
                    } else if (char === 'C') {
                        Crafty.e("Ghost").create(xCoord, yCoord, speed).setAI("Clyde");
                    } else if (char === 'G') {
                        Crafty.e("Gate").create(xCoord, yCoord);
                    }
                });
            });
        });
 
        makeFruit();
    }
 
    function makeFruit() {
        setTimeout(function () {
            Crafty.e("Fruit").create(9 * spriteSize, 12 * spriteSize);
            makeFruit();
        }, 30000);
    }
 
    //define our main scene
    Crafty.scene("main", function (mapFile) {
 
        //load our level map
        loadMap(mapFile);
    });
 
    //start the main scene
    Crafty.scene("main", "maps/level.map");
 
}());