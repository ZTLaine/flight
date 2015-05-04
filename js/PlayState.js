"use strict";

function PlayState(){};
var PlayState = function(game)
{
    this.world;
    this.dragon;
    this.map;
    this.alive;
    
    this.floor;
    this.floorTest;
    this.prints;
    this.treeLine;
    this.blood;
    this.view;
    
    this.printsDone = false;
    this.treeLineDone = false;
    this.bloodDone = false;
    this.viewDone = false;
    
    //this.goal;
    this.style;
    
    this.gravity = 500;
    this.walkSpeed = 100;
    this.flySpeed = 350;
    this.baseJump = -100;
    this.flapHeight = -250;
    
    this.startVA;
    this.footprintsVA;
    this.treelineVA;
    this.bloodVA;
    this.viewVA;
    this.landedSound;
    this.flapSound;
    this.bgm;
    this.background;
    
    this.landed = true;
}

PlayState.prototype =
{
    create: function()
    {
        console.log("Play");
        
        this.alive = true;
        
        this.game.world.setBounds(0, 0, 3200, 1824);
        this.game.physics.startSystem(Phaser.Physics.ARCADE)
        
        //tilemap setup
        this.map = this.game.add.tilemap('map');
        // map3 = game.add.tilemap('map');
        this.map.addTilesetImage('forestBGfull', 'forest');
        this.background = this.map.createLayer('forestBG');
        this.background.resizeWorld();
        this.game.stage.backgroundColor = '#2d2d2d';
        
        //event trigger areas setup
        this.floorTest = this.game.add.sprite(0, (this.game.world.height - 3), 'floorTest');
        this.prints = this.game.add.sprite(1200, (this.game.world.height - 150), 'footPrints');
        this.treeLine = this.game.add.sprite(0, (this.game.world.height - 1050), 'treeTops');
        this.blood = this.game.add.sprite(3000, (this.game.world.height - 900), 'bloodSmell');
        this.view = this.game.add.sprite(5000, 200, 'townView');
        
        //playing music
        this.bgm = this.game.add.audio('bgm');
        this.flapSound = this.game.add.audio('flapping');
        this.startVA = this.game.add.audio('startVA');
        this.footprintsVA = this.game.add.audio('footprintsVA');
        this.treelineVA = this.game.add.audio('treelineVA')
        this.bloodVA = this.game.add.audio('bloodVA');
        this.viewVA = this.game.add.audio('viewVA');
        this.landedSound = this.game.add.audio('landed');
        
        this.bgm.loop = true;
        this.bgm.volume = .25;
        this.bgm.play();
        this.startVA.play();
        
        //character setup
        this.dragon = this.game.add.sprite(32, this.game.world.height - 150, 'sindra');
        this.game.physics.arcade.enable(this.dragon);
        this.dragon.body.bounce.y = 0.2;
        this.dragon.body.gravity.y = this.gravity;
        this.dragon.anchor.setTo(.5,.5);
        this.game.camera.follow(this.dragon);
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
        
        
        this.flap = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.flap.volume = .5;
        this.flap.onDown.add(this.flapWait, this);
        
        this.style = { font: "15px Arial", fill: "#ffffff", align: "center" };
        //this.goal = this.game.add.text(16, 16, 'Look around, see if you can see any \nclues that might help you find your hatchling.', this.style);
        //this.goal.fixedToCamera = true;
        
        this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
        
    },
    
    update: function()
    {
        if(this.alive == false)
        {
            //this.dragon.animations.play('death');
            this.dragon.frame = 31;
        }
        if(this.eventTrigger(this.dragon, this.floorTest) && this.dragon.body.velocity.y > 50 && this.alive == true)
        {
        //    this.dragon.animations.play('death');
            this.alive = false;
        }
        if(this.eventTrigger(this.dragon, this.prints) && this.printsDone == false)
        {
        //    this.goal.text = 'Look at this mess of footprints!\nYou are unable to discern what made the tracks,\nbut it looks like your home had unexpected company.\nTake to the air.  If it was another dragon (or he escaped)\nyou should be able to see him once you clear the trees.';
            this.printsDone = true;
            this.footprintsVA.play();
        }
        
        if(this.eventTrigger(this.dragon, this.treeLine) && this.printsDone == true && this.treeLineDone == false)
        {
       //     this.goal.text = 'Nothing to see up here...\nMaybe you can try to smell something closer to the ground?';
            this.treeLineDone = true;
            this.treelineVA.play();
        }
        
        if(this.eventTrigger(this.dragon, this.blood) && this.printsDone == true && this.treeLineDone == true && this.bloodDone == false)
        {
        //    this.goal.text = '...This scent...\nHe was injured.\nYou still haven\'t caught the scent of another dragon.\nYou need to see what you can of the nearby town from above the edge of the forest.';
            this.bloodDone = true;
            this.bloodVA.play();
        }
        
        if(this.eventTrigger(this.dragon, this.view) && this.printsDone == true && this.treeLineDone == true && this.bloodDone == true && this.viewDone == false)
        {
        //    this.goal.text = 'It definitely looks like something has the town excited.\nYou\'re going to need to fly over.\nYou don\'t understand, why would the humans want your hatchling?\nYou\'ve always kept to yourself...';
            this.viewDone = true;
            this.viewVA.play();
        }
        
        if(this.dragon.body.onFloor())
        {
            if(this.dragon.body.onFloor() && this.landed == false)
            {
                this.landed = true;
                
                if(this.dragon.body.velocity.y >= 200)
                {
                    console.log("Shit son you ded");
                }
                this.landedSound.volume = .5;
                this.landedSound.play();
            }
            
            if(this.game.input.keyboard.isDown(Phaser.Keyboard.A))
            {
                // Move to the left
                this.dragon.body.velocity.x = (0 - this.walkSpeed);
                this.dragon.animations.play('flyLeftSlow');
            }
            else if(this.game.input.keyboard.isDown(Phaser.Keyboard.D))
            {
                this.dragon.body.velocity.x = this.walkSpeed;
                this.dragon.animations.play('flyRightSlow');
            }
            else
            {
                if(this.dragon.body.velocity.x > 0)
                {
                    this.dragon.body.velocity.x -= 5;
                }
                else if (this.dragon.body.velocity.x < 0)
                {
                    this.dragon.body.velocity.x += 5;
                }
                
                // Stand still
                this.dragon.animations.stop();
                this.dragon.frame = 7;
            }
        }
        
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.D))
        
        if (!this.dragon.body.onFloor())
        {
            // dragon.frame = 18;
            // dragon.animations.play('flyRight');
        }
         else if(this.game.input.keyboard.isDown(Phaser.Keyboard.A))
         {
            // dragon.frame = 45;
            // dragon.animations.play('flyLeft');
        }
        else if (!this.dragon.body.onFloor())
        {
            this.dragon.animations.stop();
            this.dragon.frame = 20;
        }
        
        if(this.dragon.body.velocity.x > 0)
        {
            this.dragon.body.velocity.x--;
        }
        else if (this.dragon.body.velocity.x < 0)
        {
            this.dragon.body.velocity.x++;
        }
    },
    
    //runs when flap is pressed
    flapWait: function ()
    {
        this.landed = false;
        
        if(this.dragon.body.onFloor())
        {
            this.dragon.body.velocity.y = this.baseJump;
            this.dragon.animations.play('takeOffRight');
        } 
        
        if(this.dragon.body.velocity.y > this.flapHeight)
        {
            if(this.dragon.body.velocity.y < 0)
            {
                //this.dragon.body.velocity.y += (this.flapHeight);
                this.dragon.body.velocity.y -= 150;
            }
            else
            {
                //this.dragon.body.velocity.y += this.flapHeight;
                this.dragon.body.velocity.y -= 250;
            }
            
        }
        else
        {
            //this.dragon.body.velocity.y = this.flapHeight;
            this.dragon.body.velocity.y = this.flapHeight;
        }
        this.flapSound = this.game.add.audio('flapping');
        this.flapSound.play();
        
        if(this.dragon.body.velocity.x > -this.flySpeed)
        {
            this.dragon.body.velocity.x -= 50;
            this.dragon.animations.play('flyLeft');
        }
        if(this.dragon.body.velocity.x < this.flySpeed)
        {
            this.dragon.body.velocity.x += 50;
            this.dragon.animations.play('flyRight');
        }
        
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.A))
        {
            this.dragon.animations.play('flyLeft');
            
            if(this.dragon.body.velocity.x > -this.flySpeed)
            {
                this.dragon.body.velocity.x -= 50;
            }
        }
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.D))
        {
            this.dragon.animations.play('flyRight');
            
            if(this.dragon.body.velocity.x < this.flySpeed)
            {
                this.dragon.body.velocity.x += 50;
            }
        }
    },
    
    eventTrigger: function(spriteA, spriteB)
    {
        var boundsA = spriteA.getBounds();
        var boundsB = spriteB.getBounds();
    
        return Phaser.Rectangle.intersects(boundsA, boundsB);
    }
    
};
