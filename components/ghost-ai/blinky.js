/*global Crafty*/

(function () {
    "use strict";

    //this is a ghost object
    Crafty.c("Blinky", {

        init: function () {
            this.requires("SpriteAnimation, blinky");
            this.whenToLeave = 0;
            this.inHouse = false;
            this.corner = {
                x: (Crafty.viewport.width / 20) - 1,
                y: -3
            };
        },

        getTargetTile: function (pacman) {
            return pacman.getLocation();
        },

        setAnimation: function () {
            this.reel('blinkyRight', 400, 0, 0, 2)
                .animate('blinkyRight', -1);
        }
    });
}());