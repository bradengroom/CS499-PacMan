/*global Crafty, levelBitMap, PF, searchGrid*/

(function () {
    "use strict";

    var DIRECTIONS = {
        LEFT: 1,
        RIGHT: 2,
        UP: 3,
        DOWN: 4
    };

    //this is a ghost object
    Crafty.c("Ghost", {

        init: function () {
            this.bind("PowerUpEaten", this.makeFrightened)
                .bind("EnterFrame", this.move);
            this.changeMode();
        },

        create: function (x, y, speed) {

            this.requires("2D, Canvas, Collision")
                .attr({
                    x: x,
                    y: y,
                    z: 1,
                    speed: speed,
                    startTile: {
                        x: this.getXCoord(),
                        y: this.getYCoord()
                    },
                    inHouse: true,
                    isChasing: true,
                    powerUpCount: 0
                });
            return this;
        },

        //set the ai of this ghost
        setAI: function (ai) {
            this.addComponent(ai);
            this.setAnimation();
        },

        //function to get the x coordinate of the ghost
        getXCoord: function () {
            return Math.round(this.x / this.w);
        },

        //function to get the y coordinate of the ghost
        getYCoord: function () {
            return Math.round(this.y / this.w);
        },

        getLocation: function () {
            return {
                x: this.getXCoord(),
                y: this.getYCoord()
            };
        },

        locationsAreEquals: function (a, b) {
            return a.x === b.x && a.y === b.y;
        },

        makeFrightened: function () {

            if (!this.isFrightened) {
                this.reel('blueGhost', 400, 12, 0, 2)
                    .animate('blueGhost', -1);
            }

            this.isFrightened = true;
            this.modeChanged = true;
            this.powerUpCount += 1;

            this.timeout(function () {
                this.powerUpCount -= 1;
                if (this.powerUpCount === 0) {
                    this.isFrightened = false;
                    if (!this.wasEaten) {
                        this.setAnimation();
                    }
                }
            }, 8000);
        },

        changeMode: function () {
            this.timeout(function () {
                this.isChasing = false;
                this.modeChanged = true;
                this.timeout(function () {
                    this.isChasing = true;
                    this.modeChanged = true;
                    this.changeMode();
                }, 7000);
            }, 20000);
        },

        move: function () {

            if (this.x % 20 === 0 && this.y % 20 === 0) {

                if (this.locationsAreEquals(new Crafty('Gate').getLocation(), this.getLocation())) {

                    if (this.wasEaten) {
                        this.wasEaten = false;
                        this.isFrightened = false;
                        this.modeChanged = true;
                        this.speed /= 2;
                        this.setAnimation();
                    } else {
                        this.inHouse = !this.inHouse;
                    }
                }

                if (this.inHouse) {
                    this.setDirectionTo(new Crafty('Gate').getLocation());
                } else if (this.modeChanged) {
                    this.setDirectionTo(this.previousLocation);
                    this.modeChanged = false;
                } else if (this.wasEaten) {
                    this.setDirectionTo(new Crafty('Gate').getLocation());
                } else if (this.isFrightened) {
                    var availableMoves = this.getAvailableTiles();
                    this.setDirectionTo(availableMoves[Math.floor(Math.random() * availableMoves.length)]);
                } else if (this.isChasing) {
                    this.setDirectionTo(this.getTargetTile(new Crafty('Pacman')));
                } else {
                    this.setDirectionTo(this.corner);
                }
            }

            this.moveInCurrentDirection();
        },

        setDirectionTo: function (tile) {

            var possibleMoves = this.getAvailableTiles(),
                bestMove = this.closestToTarget(possibleMoves, tile);

            this.distToGo = this.w;
            this.previousLocation = this.getLocation();

            if (bestMove.x > this.getXCoord()) { //if our new x is greater
                this.direction = DIRECTIONS.RIGHT;
            } else if (bestMove.x < this.getXCoord()) { //if our new x is less
                this.direction = DIRECTIONS.LEFT;
            } else if (bestMove.y > this.getYCoord()) { //if our new y is greater
                this.direction = DIRECTIONS.DOWN;
            } else { //if our new y is less
                this.direction = DIRECTIONS.UP;
            }
        },

        getAvailableTiles: function () {

            var x = this.getXCoord(),
                y = this.getYCoord(),

                //create a list of all touching tiles
                allMoves = [
                    //the tile above us
                    {
                        x: x,
                        y: y - 1
                    },
                    //the tile to the left of us
                    {
                        x: x - 1,
                        y: y
                    },
                    //the tile below us
                    {
                        x: x,
                        y: y + 1
                    },
                    //the tile to the right of us
                    {
                        x: x + 1,
                        y: y
                    }
                ],
                availableMoves = [];

            //for each move
            for (var i in allMoves) {
                var move = allMoves[i];

                //if the move is not a wall
                if (levelBitMap[move.y][move.x] === 0 || ((this.inHouse || this.wasEaten) && levelBitMap[move.y][move.x] === 2)) {
                    if (typeof this.previousLocation !== 'undefined' && !this.modeChanged) {
                        if (!(this.locationsAreEquals(move, this.previousLocation))) {
                            //this is an available move
                            availableMoves.push(move);
                        }
                    } else {
                        //this is an available move
                        availableMoves.push(move);
                    }
                }
            }

            //return the list of legal moves
            return availableMoves;
        },

        //returns the closest move to the target tile
        closestToTarget: function (moves, target) {

            //variables for the closest tile so far and the distance
            var closest = Infinity,
                tile = {};

            //loop over each move
            for (var i = 0; i < moves.length; i++) {

                //get the current move
                var move = moves[i],

                    //calculate the distance of the current move from the target tile
                    dist = Math.sqrt(Math.pow(move.x - target.x, 2) + Math.pow(move.y - target.y, 2));

                //if the distance is shorter than the shortest one found so far
                if (dist < closest) {

                    //update our variables
                    closest = dist;
                    tile = move;
                }
            }

            //return the closest one found
            return tile;
        },

        moveInCurrentDirection: function () {

            if (this.direction === DIRECTIONS.LEFT) {
                if (this.distToGo < this.speed) {
                    this.x = Math.round((this.x - this.speed) / this.w) * this.w;
                } else {
                    this.x -= this.speed;
                    this.distToGo -= this.speed;
                }
            } else if (this.direction === DIRECTIONS.RIGHT) {
                if (this.distToGo < this.speed) {
                    this.x = Math.round((this.x + this.speed) / this.w) * this.w;
                } else {
                    this.x += this.speed;
                    this.distToGo -= this.speed;
                }
            } else if (this.direction === DIRECTIONS.UP) {
                if (this.distToGo < this.speed) {
                    this.y = Math.round((this.y - this.speed) / this.w) * this.w;
                } else {
                    this.y -= this.speed;
                    this.distToGo -= this.speed;
                }
            } else {
                if (this.distToGo < this.speed) {
                    this.y = Math.round((this.y + this.speed) / this.w) * this.w;
                } else {
                    this.y += this.speed;
                    this.distToGo -= this.speed;
                }
            }
        }
    });
}());