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
            pacman: [12, 0],
            ghost: [0, 0],
            pellet: [14, 1],
            powerUp: [15, 0],
            blinky: [0, 0],
            inky: [6, 0],
            pinky: [4, 0],
            clyde: [2, 0],
            lives: [16, 0],
            cherry: [16, 0],


        });

        //load walls
        Crafty.sprite(spriteSize, "imgs/walls+gate.png", {
            wall: [14, 0], //self contained wall
            gate: [15, 0], //gate
            blCr: [12, 0], //bottom left corner
            regT: [4, 0], //a T intersection
            brCr: [13, 0], //bottom right corner
            lftT: [6, 0], //90 degree clockwise rotation
            ritT: [7, 0], //270 degree clockwise rotation
            tlCr: [10, 0], //top left corner
            invT: [5, 0], //180 degree clockwise rotation
            trCr: [11, 0], // top right corner
            bCap: [3, 0], //bottom cap
            tCap: [2, 0], //top cap
            horz: [9, 0], //horizontal
            late: [8, 0], //lateral
            lCap: [1, 0], //left cap
            rCap: [0, 0] //right cap
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
            initializeGame(lines[0].length, lines.length);

            //loop over each line
            $.each(lines, function (y, line) {

                var characters = line.split(""),
                    bitmap = $.map(characters, function (char) {
                        if (['W', '1', '2', '3', '4', '6', '7', '8', '9',
                            'v', '^', '<', '>', '|', '-'].indexOf(char) > -1) {
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
                        Crafty.e("Wall").create(xCoord, yCoord, "wall");
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
                    } else if (char === 'G') { //gate
                        Crafty.e("Gate").create(xCoord, yCoord, "gate");
                    } else if (char === '1') { //bottom left corner
                        Crafty.e("Wall").create(xCoord, yCoord, "blCr");
                    } else if (char === '2') { //T
                        Crafty.e("Wall").create(xCoord, yCoord, "regT");
                    } else if (char === '3') { //bottom right corner
                        Crafty.e("Wall").create(xCoord, yCoord, "brCr");
                    } else if (char === '4') { //left T
                        Crafty.e("Wall").create(xCoord, yCoord, "lftT");
                    } else if (char === '6') { //right T
                        Crafty.e("Wall").create(xCoord, yCoord, "ritT");
                    } else if (char === '7') { //top left corner
                        Crafty.e("Wall").create(xCoord, yCoord, "tlCr");
                    } else if (char === '8') { //inverted T
                        Crafty.e("Wall").create(xCoord, yCoord, "invT");
                    } else if (char === '9') { //top right corner
                        Crafty.e("Wall").create(xCoord, yCoord, "trCr");
                    } else if (char === 'v') { //bottom cap
                        Crafty.e("Wall").create(xCoord, yCoord, "bCap");
                    } else if (char === '^') { //top cap
                        Crafty.e("Wall").create(xCoord, yCoord, "tCap");
                    } else if (char === '-') { //horizontal
                        Crafty.e("Wall").create(xCoord, yCoord, "horz");
                    } else if (char === '|') { //lateral
                        Crafty.e("Wall").create(xCoord, yCoord, "late");
                    } else if (char === '<') { //left cap
                        Crafty.e("Wall").create(xCoord, yCoord, "lCap");
                    } else if (char === '>') { //right cap
                        Crafty.e("Wall").create(xCoord, yCoord, "rCap");
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
    Crafty.scene("main", "maps/level+.map");

}());