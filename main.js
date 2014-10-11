//define a sprite size
var spriteSize = 20;

//load audio files
Crafty.audio.add({
    munch: ['sounds/munch.wav']
});

//define our main scene
Crafty.scene("main", function () {

    //load our level map
    loadMap("maps/level.map", initializeGame);
});

function initializeGame(width, height) {
    //initialize our game.  We give it width, height, and the html element to pput the game in
    Crafty.init(width * spriteSize, height * spriteSize, document.getElementById('game'));

    //set the background color to black
    Crafty.background("#000000");

    //load our sprites
    Crafty.sprite(spriteSize, "imgs/pacman-20.png", {
        wall: [13, 3],
        pacman: [10, 0],
        ghost: [0, 0],
        pellet: [12, 2],
        powerUp: [12, 0],
        blinky: [0, 0],
        inky: [6, 0],
        pinky: [4, 0],
        clyde: [2, 0]
    });
}

function loadMap(file, callback) {

    //get the level map file
    $.get(file, function (levelMap) {

        var lines = levelMap.split("\n")
        
        //call our callback with the height and width of the board.  This will call initializeGame
        callback(lines[0].length, lines.length);

        //split the file by new lines and loop over each line
        $.each(lines, function (y, line) {

            //split each line into characters and loop over each character
            $.each(line.split(""), function (x, char) {


                //set the x and y coordinates for the current item
                var xCoord = x * spriteSize;
                var yCoord = y * spriteSize;

                //match and create the appropriate entity
                if (char === 'M') {
                    Crafty.e("Pacman").create(xCoord, yCoord);
                } else if (char === 'B') {
                    Crafty.e("Ghost").create(xCoord, yCoord, 'blinky');
                } else if (char === 'I') {
                    Crafty.e("Ghost").create(xCoord, yCoord, 'inky');
                } else if (char === 'P') {
                    Crafty.e("Ghost").create(xCoord, yCoord, 'pinky');
                } else if (char === 'C') {
                    Crafty.e("Ghost").create(xCoord, yCoord, 'clyde');
                } else if (char === 'p') {
                    Crafty.e("Pellet").create(xCoord, yCoord);
                } else if (char === 'S') {
                    Crafty.e("PowerUp").create(xCoord, yCoord);
                } else if (char === 'W') {
                    Crafty.e("Wall").create(xCoord, yCoord);
                }
            });
        });
    });
}

//start the main scene
Crafty.scene("main");