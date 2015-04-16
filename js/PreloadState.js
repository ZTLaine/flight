"use strict";

function PreloadState(){};

PreloadState.prototype =
{
    //load assets for the game
    preload: function()
    {
        /* Set-up the loading bar */
    	this.loading = this.game.add.sprite(this.game.world.centerX - 180, this.game.world.centerY - 30, 'load', 0);
    	this.loading.animations.add('move', [0, 1, 2, 3], 10, true, true);
    	this.loading.animations.play('move');
        //this.loading.anchor.setTo(0.5,0.5);
        //this.load.setPreloadSprite(loading); 
            
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
