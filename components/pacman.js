//this is a pacman object
Crafty.c("Pacman", {

    direction: null,
    keyPressed: null,

    create: function (x, y) {

        this.requires("2D, Canvas, pacman, Collision, SpriteAnimation")
            .attr({
                x: x,
                y: y
            })
        //allow the user to control pacman in 4 directions (speed of 2)
        //.multiway(2, {UP_ARROW: -90, DOWN_ARROW: 90, RIGHT_ARROW: 0, LEFT_ARROW: 180})
        //when pacman hits a pellet, destroy it and play a munching sound
        .onHit("Pellet", function (ent) {
            ent[0].obj.destroy();
            Crafty.audio.play('munch');
        })
        //when pacman hits a powerup, destroy it
        .onHit("PowerUp", function (ent) {
            ent[0].obj.destroy();
        })
        //when packman moves, if he hits a wall, cancel the movement
        /*        .bind('Moved', function (from) {
            if (this.hit('Wall')) {
                console.log('hit wall');
                this.attr({
                    x: from.x,
                    y: from.y
                });
            }
        })*/
        //when the user presses an arrow key, let's change the animation
        .bind("KeyDown", function (e) {
            this.keyPressed = e.keyCode;
            if (e.keyCode === Crafty.keys.DOWN_ARROW) {
                this.animateDown();
            } else if (e.keyCode === Crafty.keys.UP_ARROW) {
                this.animateUp();
            } else if (e.keyCode === Crafty.keys.LEFT_ARROW) {
                this.animateLeft();
            } else if (e.keyCode === Crafty.keys.RIGHT_ARROW) {
                this.animateRight();
            }
        })
        //make pacman move each frame
        .bind("EnterFrame", function () {

            var moved = this.tryMove(this.keyPressed);

            //if we hit a wall
            if (!moved) {

                //try to move in the original direction
                this.tryMove(this.direction);

            } else {
                //if we did not hit a wall, this is our new direction
                this.direction = this.keyPressed;
            }
        });
    },

    animateDown: function () {
        this.reel('pacmanDown', 300, 10, 1, 2)
            .animate('pacmanDown', -1);
    },
    animateUp: function () {
        this.reel('pacmanUp', 300, 10, 3, 2)
            .animate('pacmanUp', -1);
    },
    animateLeft: function () {
        this.reel('pacmanLeft', 300, 10, 2, 2)
            .animate('pacmanLeft', -1);
    },
    animateRight: function () {
        this.reel('pacmanRight', 300, 10, 0, 2)
            .animate('pacmanRight', -1);
    },
    tryMove: function (direction) {

        var originalX = this.x;
        var originalY = this.y;
        var speed = 2;

        //try to move in the given direction
        if (direction === Crafty.keys.DOWN_ARROW) {
            this.y += speed;
        } else if (direction === Crafty.keys.UP_ARROW) {
            this.y -= speed;
        } else if (direction === Crafty.keys.LEFT_ARROW) {
            this.x -= speed;
        } else if (direction === Crafty.keys.RIGHT_ARROW) {
            this.x += speed;
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