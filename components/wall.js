//this is a wall object
Crafty.c("Wall", {

    create: function (x, y) {

        this.requires("2D, Canvas, wall, Collision")
            .attr({
                x: x,
                y: y
            })
    }
});