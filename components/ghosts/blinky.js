/*global Crafty*/

(function () {
    "use strict";

    //this is a ghost object
    Crafty.c("Blinky", {

        create: function (x, y) {

            this.requires("2D, Canvas, Collision, SpriteAnimation, Ghost, blinky")
                .attr({
                    x: x,
                    y: y,
                    z: 1
                });

            this.setAnimation();
        },

        setAnimation: function () {
            this.reel('blinkyRight', 400, 0, 0, 2)
                .animate('blinkyRight', -1);
        }
    });
}());