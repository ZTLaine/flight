"use strict";

function PlayState(){};

PlayState.prototype =
{
    create: function()
    {
        console.log("Play");
        
        this.bubbleCounter = 0;
        this.timeCheck = this.game.time.now;
        
        this.bubbles = this.game.add.group();
        this.bubbles.enableBody = true;
        this.bubbles.inputEnabled = true;
        this.createBubbles(20);
        
    },
    
    update: function()
    {
        if(this.game.time.now - this.timeCheck > 1000 && this.bubbleCounter > 0)
        {
            this.createBubbles(1);
            this.timeCheck = this.game.time.now;
        }
        if(this.bubbleCounter <= 0)
        {
            this.timeCheck = this.game.time.now;
            var victoryScreen = this.game.add.sprite(0,0, 'victoryScreen');
            if(this.game.input.activePointer.isDown)
            {
                this.game.state.start("intro");
            }
            
        }
    },
    
    createBubbles: function(n)
    {
        for(var i = 0; i < n; i++)
        {
            var x = this.game.rnd.integerInRange(0, 770);
            var y = this.game.rnd.integerInRange(0, 570);
            var bubbleColor = this.game.rnd.integerInRange(0,7);
            
            var bubble = this.bubbles.create(x,y, "bubbles", bubbleColor);
            var scale = this.game.rnd.integerInRange(1, 2);
            bubble.scale.set(scale);
            
            bubble.body.collideWorldBounds = true;
            bubble.body.immovable = true;
            bubble.inputEnabled = true;
            
            bubble.events.onInputDown.add(this.bubbleClick, this);
            this.bubbleCounter++;
        }    
    },
    
    bubbleClick: function(bubble)
    {
        this.bubbleCounter--;
        var pop2 = this.game.add.audio('pop2');
        var pop3 = this.game.add.audio('pop3');
        
        if(this.game.time.now % 2 == 0)
        {
            pop2.play();
        }
        else
        {
            pop3.play();
        }
        bubble.destroy();
    }
    
    
};
