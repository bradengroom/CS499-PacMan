//this is a ghost object
Crafty.c("Ghost", {

    create: function (x, y) {

        this.requires("2D, Canvas, Collision, ghost")
            .attr({
                x: x,
                y: y,
                z: 1
            })
    }
});