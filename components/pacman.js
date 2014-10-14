/*global Crafty*/

(function () {
    "use strict";

    //this is a pacman object
    Crafty.c("Pacman", {

        //pacmans speed
        speed: 2,

        //we will put pacman's current direction here
        direction: null,

        //this variable will save the last key pressed by the user
        //pacman starts a game by going left
        keyPressed: Crafty.keys.LEFT_ARROW,

        create: function (x, y) {

            this.requires("2D, Canvas, pacman, Collision, SpriteAnimation")
                .attr({
                    //set pacman x,y attributes
                    x: x,
                    y: y
                })
                .onHit("Pellet", function (ent) {
                    //when pacman hits a pellet, destroy it and play a munching sound
                    ent[0].obj.destroy();
                    Crafty.audio.play('munch');
                })
                .onHit("PowerUp", function (ent) {
                    //when pacman hits a powerup, destroy it
                    ent[0].obj.destroy();
                    Crafty('Blinky').makeBlue();
                    Crafty('Inky').makeBlue();
                    Crafty('Pinky').makeBlue();
                    Crafty('Clyde').makeBlue();
                })
                .bind("KeyDown", function (e) {
                    //when the user presses an arrow key, let's update the keyPressed variable

                    //we only need to update the variable if the key is different from our current direction
                    if (e.keyCode !== this.direction) {

                        //we only need to update the variable if the key is an arrow key
                        if (e.keyCode === Crafty.keys.LEFT_ARROW || e.keyCode === Crafty.keys.RIGHT_ARROW || e.keyCode === Crafty.keys.UP_ARROW || e.keyCode === Crafty.keys.DOWN_ARROW) {

                            //update the variable
                            this.keyPressed = e.keyCode;
                        }
                    }
                })
                .bind("EnterFrame", function () {
                    //make pacman move each frame

                    //a variable to track if we have moved or not
                    var moved = false;

                    //has a new direction key been pressed since the last from?
                    if (this.keyPressed !== null) {

                        //try to move in that direction
                        moved = this.tryMove(this.keyPressed);
                    }

                    //if we hit a wall
                    if (!moved) {

                        //try to move in the original direction
                        this.tryMove(this.direction);

                    } else {
                        //if we did not hit a wall, this is our new direction
                        this.direction = this.keyPressed;

                        //null out our keyPressed variable
                        this.keyPressed = null;

                        //also, update pacman's animation to match our new direction
                        this.updateAnimation();
                    }
                });
        },

        updateAnimation: function () {
            if (this.direction === Crafty.keys.DOWN_ARROW) {
                this.reel('pacmanDown', 300, 10, 1, 2)
                    .animate('pacmanDown', -1);
            } else if (this.direction === Crafty.keys.UP_ARROW) {
                this.reel('pacmanUp', 300, 10, 3, 2)
                    .animate('pacmanUp', -1);
            } else if (this.direction === Crafty.keys.LEFT_ARROW) {
                this.reel('pacmanLeft', 300, 10, 2, 2)
                    .animate('pacmanLeft', -1);
            } else if (this.direction === Crafty.keys.RIGHT_ARROW) {
                this.reel('pacmanRight', 300, 10, 0, 2)
                    .animate('pacmanRight', -1);
            }
        },

        //this function will attempt to move pacman in the given direction
        //the function will return true if the move was successful
        tryMove: function (direction) {

            //save our original coordinates. this way we can move back if we hit a wall
            var originalX = this.x,
                originalY = this.y;

            //try to move in the given direction
            if (direction === Crafty.keys.DOWN_ARROW) {
                this.y += this.speed;
            } else if (direction === Crafty.keys.UP_ARROW) {
                this.y -= this.speed;
            } else if (direction === Crafty.keys.LEFT_ARROW) {
                this.x -= this.speed;
            } else if (direction === Crafty.keys.RIGHT_ARROW) {
                this.x += this.speed;
            }

            //if pacman goes off the left edge of the map
            if (this.x <= -this.w) {
                //put him on the right edge
                this.x += Crafty.viewport.width + this.w;

                //if pacman goes off the right edge of the map
            } else if (this.x >= Crafty.viewport.width + this.w) {
                //put him on the left edge
                this.x -= Crafty.viewport.width + 2 * this.w;
            }

            //if pacman goes off the top edge of the map
            if (this.y <= -this.h) {

                //put him on the bottom edge
                this.y += Crafty.viewport.height + this.h;

                //if pacman goes off the bottom edge of the map
            } else if (this.y >= Crafty.viewport.height + this.h) {

                //put him on the top edge
                this.y -= Crafty.viewport.height + 2 * this.h;
            }

            //if we hit a wall
            if (this.hit('Wall')) {

                //go back
                this.attr({
                    x: originalX,
                    y: originalY
                });

                return false;
            } else {
                return true;
            }
        }
    });
}());