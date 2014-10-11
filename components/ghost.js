//this is a ghost object
Crafty.c("Ghost", {

    create: function (x, y) {

        this.requires("2D, Canvas, Collision, ghost, SpriteAnimation")
            .attr({
                x: x,
                y: y,
                z: 1
            }).reel('ghostRight', 400, 0, 0, 2)
            .animate('ghostRight', -1)
    }
});