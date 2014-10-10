//this is a powerup object
Crafty.c("PowerUp", {

    create: function (x, y) {

        this.requires("2D, Canvas, powerUp")
            .attr({
                x: x,
                y: y
            })
    }
});