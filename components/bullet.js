/*global Crafty*/

//create the bullet component
Crafty.c("Bullet", {
    bullet: function(dir) {
        this.bind("EnterFrame", function() {            
            this.move(dir, 15);
            if(this.x > Crafty.viewport._width || this.x < 0 || 
               this.y > Crafty.viewport._height || this.y < 0) 
                this.destroy();
        });
        return this;
    }
});