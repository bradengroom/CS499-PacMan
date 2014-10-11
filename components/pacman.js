//this is a pacman object
Crafty.c("Pacman", {

    create: function (x, y) {

        this.requires("2D, Canvas, pacmanRight1, Fourway, Collision, SpriteAnimation")
            .attr({
                x: x,
                y: y,
                z: 1
            })
        //allow the user to control pacman in 4 directions (speed of 2)
        .fourway(2)
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
        .bind('Moved', function (from) {
            if (this.hit('Wall')) {
                this.attr({
                    x: from.x,
                    y: from.y
                });
            }
        })
        //when the user presses an arrow key, let's change the animation
        .bind("KeyDown", function (e) {
            if (e.keyCode === Crafty.keys.DOWN_ARROW) {
                this.animateDown();
            } else if (e.keyCode === Crafty.keys.UP_ARROW) {
                this.animateUp();
            } else if (e.keyCode === Crafty.keys.LEFT_ARROW) {
                this.animateLeft();
            } else if (e.keyCode === Crafty.keys.RIGHT_ARROW) {
                this.animateRight();
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
    }
});