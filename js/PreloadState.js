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
        this.game.load.tilemap('map', 'assets/flightForest.json', null, Phaser.Tilemap.TILED_JSON);
        
        /* Load images */
        this.game.load.image("startScreen", "assets/startScreen.png");
        this.game.load.image("victoryScreen", "assets/victoryScreen.png");
        
        this.game.load.image('footPrints', 'assets/prints.png');
        this.game.load.image('treeTops', 'assets/aboveTrees.png');
        this.game.load.image('bloodSmell', 'assets/blood.png');
        this.game.load.image('townView', 'assets/view.png');
        this.game.load.image('forest', 'assets/forest_background_by_jbjdesigns-d5mgjm3.png');

        /* Load spritesheets */
        this.game.load.spritesheet('sindra', 'assets/dragonProtag1.png', 200, 150, 52);
            
        /* Load sounds */
        this.game.load.audio('reunited', 'assets/Reunited.mp3');
        this.game.load.audio('flapping', 'assets/flapFast.mp3');
        this.game.load.audio('bgm', 'assets/DeathIsJustAnotherPath.mp3');
    },
    
    create: function()
    {
        console.log("Preloaded");
        
        //start BGM here?  
        
        this.game.state.start("intro");
    }
};
