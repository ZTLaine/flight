//handles the booting

"use strict";

var BootState = function(){};

BootState.prototype = 
{
    //load the loading image
    preload: function()
    {
        //this.game.load.image("loading", "assets/loading.png");
    },
    
    //move to preload
    create: function()
    {
        console.log("Booted");
        this.game.state.start("preload");
    }
};
