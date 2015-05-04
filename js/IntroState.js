"use strict";

function IntroState(){};

IntroState.prototype =
{
    //create intro sprite
    create: function()
    {
        console.log("Intro");
        
        var startScreen = this.game.add.sprite(0,0, 'startScreen');
        
        //set the start variables for the game
        
        this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
    },
    
    update: function()
    {
        //wait for click input go to play
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
        {
            this.timeCheck = 0;
            this.game.state.start("play");
        }
    }
};
