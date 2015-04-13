"use strict";

function PreloadState(){};

PreloadState.prototype =
{
    //load assets for the game
    preload: function()
    {
        /* Set-up the loading bar */
    /*        var loadingBar = this.add.sprite(400,300,"loading");
            loadingBar.anchor.setTo(0.5,0.5);
            this.load.setPreloadSprite(loadingBar); */
            
        /* Load tile map */
        
        /* Load images */
        this.game.load.image("startScreen", "assets/startScreen.png");
        this.game.load.image("victoryScreen", "assets/victoryScreen.png");

        /* Load spritesheets */
        this.game.load.spritesheet("bubbles", "assets/bubbles.png", 40, 40);
            
        /* Load sounds */
        this.game.load.audio("pop1", "assets/pop1.mp3");
        this.game.load.audio("pop2", "assets/pop2.mp3");
        this.game.load.audio("pop3", "assets/pop3.mp3");
        this.game.load.audio("bgm", "assets/Reunited.mp3");
    },
    
    create: function()
    {
        console.log("Preloaded");
        
        //start BGM here?  
        
        this.game.state.start("intro");
    }
};
