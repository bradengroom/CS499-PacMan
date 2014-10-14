/*global Crafty*/

(function () {
    "use strict";

    //this is a ghost object
    Crafty.c("Clyde", {

        create: function (x, y) {

            this.requires("2D, Canvas, Collision, SpriteAnimation, Ghost, clyde")
                .attr({
                    x: x,
                    y: y,
                    z: 1
                });
            
            this.setAnimation();
        },

        setAnimation: function () {
            this.reel('clydeRight', 400, 2, 0, 2)
                .animate('clydeRight', -1);
        }
    });
}());