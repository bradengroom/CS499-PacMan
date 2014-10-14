/*global Crafty*/

(function () {
    "use strict";

    //this is a ghost object
    Crafty.c("Inky", {

        create: function (x, y) {

            this.requires("2D, Canvas, Collision, SpriteAnimation, Ghost, inky")
                .attr({
                    x: x,
                    y: y,
                    z: 1
                });
            
            this.setAnimation();
        },

        setAnimation: function () {
            this.reel('inkyRight', 400, 6, 0, 2)
                .animate('inkyRight', -1);
        }
    });
}());