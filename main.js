//define a sprite size
var spriteSize = 20;

//initialize our game.  We give it width, height, and the html element to pput the game in
Crafty.init(19 * spriteSize, 21 * spriteSize, document.getElementById('game'));

//load our sprites
Crafty.sprite(spriteSize, "imgs/pacman-20.png", {
    wall: [13, 3],
    pacman: [11, 0],
    ghost: [0, 0],
    pellet: [12, 2],
    powerUp: [12, 0]
});

//define our main scene
Crafty.scene("main", function () {
    
    //set the background color to black
    Crafty.background("#000000");
    
    //load our level map
    loadMap("maps/level.map");
});

function loadMap(file) {
    
    //get the level map file
    $.get(file, function (levelMap) {
        
        //split the file by new lines and loop over each line
        $.each(levelMap.split("\n"), function (y, line) {
            
            //split each line into characters and loop over each character
            $.each(line.split(""), function (x, char) {

                //set the x and y coordinates for the current item
                var xCoord = x * spriteSize;
                var yCoord = y * spriteSize;

                //match and create the appropriate entity
                if (char === 'P') {
                    Crafty.e("Pacman").create(xCoord, yCoord);
                } else if (char === 'G') {
                    Crafty.e("Ghost").create(xCoord, yCoord);
                } else if (char === 'p') {
                    Crafty.e("Pellet").create(xCoord, yCoord);
                } else if (char === 'B') {
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