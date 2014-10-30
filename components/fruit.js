/*global Crafty*/

(function () {
    "use strict";

    //this is a pellet object
    Crafty.c("Fruit", {

        create: function (x, y) {

            this.requires("2D, Canvas, Collision, strawberry")
                .attr({
                    x: x,
                    y: y
                });
        }
    });
}());