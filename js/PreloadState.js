"use strict";

function PreloadState(){};

PreloadState.prototype =
{
    //load assets for the game
    preload: function()
    {
        /* Set-up the loading bar */
        this.game.stage.backgroundColor = '#538C40';
    	this.loading = this.game.add.sprite(this.game.world.centerX - 100, this.game.world.centerY - 100, 'load', 0);
    	this.loading.animations.add('move', [0, 1, 2, 3], 5, true, true);
    	this.loading.animations.play('move');
        //this.loading.anchor.setTo(0.5,0.5);
        //this.load.setPreloadSprite(loading); 
            
        /* Load tile map */
        this.game.load.tilemap('map', 'assets/flightForest.json', null, Phaser.Tilemap.TILED_JSON);
        
        /* Load images */
        this.game.load.image("startScreen", "assets/startScreen.png");
        //this.game.load.image("victoryScreen", "assets/victoryScreen.png");
        
        this.game.load.image('floor', 'assets/floorCollide.png');
        this.game.load.image('floorTest', 'assets/floorCollideTest.png');
        this.game.load.image('footPrints', 'assets/prints.png');
        this.game.load.image('treeTops', 'assets/aboveTrees.png');
        this.game.load.image('bloodSmell', 'assets/blood.png');
        this.game.load.image('townView', 'assets/view.png');
        this.game.load.image('forest', 'assets/forestBGfull.png');

        /* Load spritesheets */
        this.game.load.spritesheet('sindra', 'assets/dragonProtag1.png', 200, 150, 52);
            
        /* Load sounds */
        this.game.load.audio('reunited', 'assets/Reunited.mp3');
        this.game.load.audio('flapping', 'assets/flapFast.mp3');
        this.game.load.audio('bgm', 'assets/DeathIsJustAnotherPath.mp3');
        this.game.load.audio('landed', 'assets/landed.mp3');
        this.game.load.audio('startVA', 'assets/startVA.mp3');
        this.game.load.audio('footprintsVA', 'assets/footprintsVA.mp3');
        this.game.load.audio('treelineVA', 'assets/treelineVA.mp3');
        this.game.load.audio('bloodVA', 'assets/bloodVA.mp3');
        this.game.load.audio('viewVA', 'assets/viewVA.mp3');
    },
    
    create: function()
    {
        console.log("Preloaded");
        
        //start BGM here?  
        
        this.game.state.start("intro");
    }
};
