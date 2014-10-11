//this is a pacman object
Crafty.c("Pacman", {

    direction: null,
    keyPressed: Crafty.keys.LEFT_ARROW,

    create: function (x, y) {

        this.requires("2D, Canvas, pacman, Collision, SpriteAnimation")
            .attr({
                x: x,
                y: y
            })
        //when pacman hits a pellet, destroy it and play a munching sound
        .onHit("Pellet", function (ent) {
            ent[0].obj.destroy();
            Crafty.audio.play('munch');
        })
        //when pacman hits a powerup, destroy it
        .onHit("PowerUp", function (ent) {
            ent[0].obj.destroy();
        })
        //when the user presses an arrow key, let's change the animation
        .bind("KeyDown", function (e) {
            if (e.keyCode !== this.direction) {
                this.keyPressed = e.keyCode;
            }
        })
        //make pacman move each frame
        .bind("EnterFrame", function () {

            var moved = false;

            if (this.keyPressed !== null) {
                moved = this.tryMove(this.keyPressed);
            }

            //if we hit a wall
            if (!moved) {

                //try to move in the original direction
                this.tryMove(this.direction);

            } else {
                //if we did not hit a wall, this is our new direction
                this.direction = this.keyPressed;
                this.keyPressed = null;

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

        //if pacman goes off the left edge of the map
        if (this.x <= 0 - this.w) {
            //put him on the right edge
            this.x += Crafty.viewport.width + this.w;

            //if pacman goes off the right edge of the map
        } else if (this.x >= Crafty.viewport.width + this.w) {
            //put him on the left edge
            this.x -= Crafty.viewport.width + 2 * this.w;
        }

        //if pacman goes off the top edge of the map
        if (this.y <= 0 - this.h) {
            
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