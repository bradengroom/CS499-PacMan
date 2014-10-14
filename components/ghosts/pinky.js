/*global Crafty*/

(function () {
    "use strict";

    //this is a ghost object
    Crafty.c("Pinky", {

        create: function (x, y) {

            this.requires("2D, Canvas, Collision, SpriteAnimation, Ghost, pinky")
                .attr({
                    x: x,
                    y: y,
                    z: 1
                });

            this.setAnimation();
        },

        setAnimation: function () {
            this.reel('pinkyRight', 400, 4, 0, 2)
                .animate('pinkyRight', -1);
        }
    });
}());