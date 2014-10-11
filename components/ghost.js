//this is a ghost object
Crafty.c("Ghost", {

    create: function (x, y, name) {

        this.name = name;

        this.requires("2D, Canvas, Collision, " + this.name + ", SpriteAnimation")
            .attr({
                x: x,
                y: y,
                z: 1
            });

        this.addAnimation();
    },

    addAnimation: function () {

        if (this.name === 'blinky') {
            this.reel('blinkyRight', 400, 0, 0, 2)
                .animate('blinkyRight', -1);
        } else if (this.name === 'inky') {
            this.reel('inkyRight', 400, 6, 0, 2)
                .animate('inkyRight', -1);
        } else if (this.name === 'pinky') {
            this.reel('pinkyRight', 400, 4, 0, 2)
                .animate('pinkyRight', -1);
        } else if (this.name === 'clyde') {
            this.reel('clydeRight', 400, 2, 0, 2)
                .animate('clydeRight', -1);
        }
    }
});