/*global Crafty*/

(function () {
    "use strict";

    //this is a ghost object
    Crafty.c("Ghost", {

        isBlue: false,

        makeBlue: function () {
            
            //set the isBlue variable to true
            this.isBlue = true;
            
            //give the ghost the blue animation
            this.reel('blueRight', 600, [[12, 0], [12, 1]])
                .animate('blueRight', -1);
            
            //after 7 seconds
            this.timeout(function () {
                
                //set the animation back to normal
                this.setAnimation();
                
                //set the isBlue variable to false
                this.isBlue = false;
            }, 7000);
            
        }
    });
}());