//this is a pacman object
Crafty.c("Pacman", {

    create: function (x, y) {

        this.requires("2D, Canvas, pacman, Fourway, Collision")
            .attr({
                x: x,
                y: y,
                z: 1
            })
        //allow the user to control pacman in 4 directions
        .fourway(4)
        //when pacman hits a pellet, destroy it
        .onHit("Pellet", function (ent) {
            ent[0].obj.destroy();
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
        });
    }
});