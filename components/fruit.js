/*global Crafty*/

(function () {
    "use strict";

    //this is a pellet object
    Crafty.c("Fruit", {

        create: function (x, y) {
            
            var fruitList = ["cherry", "strawberry", "orange", "banana"];
            
            var index = (Crafty("Levels").getLevels()-1)%4;
            
            var fruit = fruitList[index];

            this.requires("2D, Canvas, Collision," + fruit)
                .attr({
                    x: x,
                    y: y
                });
        }
    });
}());