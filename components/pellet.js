/*global Crafty*/

(function () {
    "use strict";

    //this is a pellet object
    Crafty.c("Pellet", {

        create: function (x, y) {

            this.requires("2D, Canvas, pellet")
                .attr({
                    x: x,
                    y: y
                });
        }
    });
}());