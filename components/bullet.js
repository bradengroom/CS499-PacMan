/*global Crafty*/

//create the bullet component
Crafty.c("bullet", {
    bullet: function() {
        this.bind("EnterFrame", function() {            
            if(this.x > Crafty.viewport._width || this.x < 0 || 
               this.y > Crafty.viewport._height || this.y < 0) 
                this.destroy();
        });
        return this;
    }
});