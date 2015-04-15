"use strict";

function PlayState(){};

PlayState.prototype =
{
    create: function()
    {
        console.log("Play");
        
        this.game.world.setBounds(0, 0, 3200, 1824);
        this.game.physics.startSystem(Phaser.Physics.ARCADE)
        
        //tilemap setup
        this.map = game.add.tilemap('map');
        // map3 = game.add.tilemap('map');
        this.map.addTilesetImage('forest_background_by_jbjdesigns-d5mgjm3', 'forest');
        this.background = map.createLayer('forestBG');
        this.background.resizeWorld();
        this.game.stage.backgroundColor = '#2d2d2d';
        
        //event trigger areas setup
        this.prints = game.add.sprite(1200, (game.world.height - 150), 'footPrints');
        this.treeLine = game.add.sprite(0, (game.world.height - 1050), 'treeTops');
        this.blood = game.add.sprite(3000, (game.world.height - 900), 'bloodSmell');
        this.view = game.add.sprite(5000, 200, 'townView');
        
        //playing music
        this.bgm = game.add.audio('bgm');
        this.bgm.loop = true;
        this.bgm.volume = .5;
        this.bgm.play();
        this.flapSound = game.add.audio('flapping');
        
        //character setup
        this.dragon = game.add.sprite(32, game.world.height - 150, 'sindra');
        this.game.physics.arcade.enable(dragon);
        this.dragon.body.bounce.y = 0.2;
        this.dragon.body.gravity.y = gravity;
        this.dragon.anchor.setTo(.5,.5);
        this.game.camera.follow(dragon);
        this.dragon.body.collideWorldBounds = true;
        this.dragon.scale.set(.75);
        
        this.dragon.animations.add('takeOffRight', [13, 14, 15, 16], 10, false);
        this.dragon.animations.add('flyRight', [17, 18, 19, 18], 10, false);
        this.dragon.animations.add('flyRightSlow', [17, 18, 19, 18], 5, false);
        this.dragon.animations.add('landRight', [20, 21, 22, 23, 24], 10, false);
        this.dragon.animations.add('takeOffLeft', [50, 49, 48, 47], 10, false);
        this.dragon.animations.add('flyLeft', [46, 45, 44, 45], 10, false);
        this.dragon.animations.add('flyLeftSlow', [46, 45, 44, 45], 5, false);
        this.dragon.animations.add('landLeft', [43, 42, 41, 40, 39], 10, false);
        this.dragon.animations.add('death', [26, 27, 28, 29, 30, 31], 10, false);
        
        
        this.flap = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.flap.volume = .5;
        this.flap.onDown.add(flapWait, this);
        
        this.style = { font: "15px Arial", fill: "#ffffff", align: "center" };
        this.goal = game.add.text(16, 16, 'Look around, see if you can see any \nclues that might help you find your hatchling.', style);
        this.goal.fixedToCamera = true;
        
        this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
        
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
