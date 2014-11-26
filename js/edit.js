var levelBitMap = [];

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
        cherry: [16, 0]
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
        munch: ['sounds/munch.wav'],
        life: ['sounds/life.wav'],
        begin: ['sounds/begin.wav'],
        fruit: ['sounds/fruit.wav'],
        death: ['sounds/death.wav'],
        ghost: ['sounds/ghost.wav'],
        extralife: ['sounds/extralife.wav'],
        siren: ['sounds/siren.wav']
    });
    //play the intro tune when game starts
    Crafty.audio.play('begin');

    // setTimeout(function(){Crafty.unpause();}, 1000);

}

function makeFruit() {
    setTimeout(function () {
        Crafty.e("Fruit").create(9 * spriteSize, 12 * spriteSize);
        makeFruit();
    }, 30000);
}

function loadMap(levelMap) {
    console.log("called");
    //split file into lines
    var lines = levelMap.split("\n");

    //call initializeGame
    initializeGame(lines[0].length, lines.length);

    //loop over each line
    $.each(lines, function (y, line) {

        var characters = line.split(""),
            bitmap = $.map(characters, function (char) {
                if (['W', '1', '2', '3', '4', '6', '7', '8', '9', 'v', '^', '<', '>', '|', '-'].indexOf(char) > -1) {
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
    makeFruit();
}

Crafty.defineScene("startScreen", function () {
    Crafty.init('385', '440', document.getElementById('game'));
    Crafty.background("blue");
    Crafty.e("2D, DOM, Text, Mouse")
        .attr({
            w: 300,
            h: 50,
            x: 40,
            y: 200
        })
        .text("Start Game")
        .css({
            "text-align": "center",
            'cursor': 'pointer'
        })
        .textFont({
            size: '30px',
            weight: 'bold'
        })
        .textColor("#FFFFFF")
        .bind('Click', function () {
            console.log("over");
            Crafty.enterScene("game");
        });
});

//define our game scene
Crafty.defineScene("game", function () {

    //load our level map
    loadMap(getMap());
});

var pixelSize = 20;
var img = document.getElementById("W");

var mapData = new Array(21);

function clearMap() {
    for (var i = 0; i < 21; i++) {
        mapData[i] = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
    }
}

function getMap() {
    var mapString = "Z             XXXXX\n";
    for (var i = 0; i < 21; i++) {
        mapString += mapData[i].join("") + "\n";
    }
    return mapString;
}

clearMap();

$(".sprite").click(function () {
    img = this;
});

interact('.rainbow-pixel-canvas')
    .snap({
        // snap to the corners of a grid
        mode: 'grid',
        // specify the grid dimensions
        grid: {
            x: pixelSize,
            y: pixelSize
        },
    })
    .origin('self')
    .draggable({
        max: Infinity,
        maxPerElement: Infinity
    })
    .on('dragmove', function (event) {
        var context = event.target.getContext('2d');

        context.clearRect(event.pageX - pixelSize, event.pageY - pixelSize, pixelSize, pixelSize);
        context.drawImage(img, event.pageX - pixelSize, event.pageY - pixelSize);
        mapData[(event.pageY - pixelSize) / pixelSize][(event.pageX - pixelSize) / pixelSize] = img.id;
    })

function resizeCanvases() {
    [].forEach.call(document.querySelectorAll('.rainbow-pixel-canvas'), function (canvas) {
        canvas.width = 380;
        canvas.height = 420;
    });
}

interact(document).on('DOMContentLoaded', resizeCanvases);

interact.maxInteractions(Infinity);

function loadCustomMap() {

    // Start the start screen
    Crafty.scene("startScreen");
}