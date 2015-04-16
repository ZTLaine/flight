//handles the booting

"use strict";

var BootState = function(){};

BootState.prototype = 
{
    //load the loading image
    preload: function()
    {
        this.game.load.spritesheet("load", "assets/loading.png", 200, 200, 4);
    },
    
    //move to preload
    create: function()
    {
        console.log("Booted");
        this.game.state.start("preload");
    }
};
