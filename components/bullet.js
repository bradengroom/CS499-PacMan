/*global Crafty*/

//create the bullet component
Crafty.c("bullet", {
    bullet: function(dir) {
        this.bind("enterframe", function() {            
            this.move(dir, 15);
            if(this.x > Crafty.viewport.width || this.x < 0) 
                this.destroy();
        });
        return this;
    }
});