window.onload = function()
{
    // You might want to start with a template that uses GameStates:
    // https://github.com/photonstorm/phaser/tree/master/resources/Project%20Templates/Basic
    "use strict";
    var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );
    
    var dragon;
    var map;
    
    var prints;
    var treeLine;
    var blood;
    var view;
    
    var printsDone = false;
    var treeLineDone = false;
    var bloodDone = false;
    var viewDone = false;
    
    var goal;
    var style;
    
    var gravity = 500;
    var walkSpeed = 100;
    var flySpeed = 350;
    var baseJump = -100;
    var flapHeight = -250;
    
    var flapSound;
    var bgm;
    var background;
    
    function preload()
    {
        game.load.spritesheet('sindra', 'assets/dragonProtag1.png', 200, 150, 52);
//        game.load.image('grass', 'assets/grass.png');
//        game.load.image('BG', 'assets/grassyBG.png');
        game.load.image('footPrints', 'assets/prints.png');
        game.load.image('treeTops', 'assets/aboveTrees.png');
        game.load.image('bloodSmell', 'assets/blood.png');
        game.load.image('townView', 'assets/view.png');
        game.load.image('forest', 'assets/forest_background_by_jbjdesigns-d5mgjm3.png');
        game.load.tilemap('map', 'assets/flightForest.json', null, Phaser.Tilemap.TILED_JSON);
        
        game.load.audio('reunited', 'assets/Reunited.mp3');
        game.load.audio('flapping', 'assets/flapFast.mp3');
        game.load.audio('bgm', 'assets/DeathIsJustAnotherPath.mp3');
    }
    function create()
    {
        game.world.setBounds(0, 0, 3200, 1824);
        game.physics.startSystem(Phaser.Physics.ARCADE)
        
        //tilemap setup
        map = game.add.tilemap('map');
        // map3 = game.add.tilemap('map');
        map.addTilesetImage('forest_background_by_jbjdesigns-d5mgjm3', 'forest');
        background = map.createLayer('forestBG');
        background.resizeWorld();
        game.stage.backgroundColor = '#2d2d2d';
        
        //event areas setup
        prints = game.add.sprite(1200, (game.world.height - 150), 'footPrints');
        treeLine = game.add.sprite(0, (game.world.height - 1050), 'treeTops');
        blood = game.add.sprite(3000, (game.world.height - 900), 'bloodSmell');
        view = game.add.sprite(5000, 200, 'townView');
        
        //playing music
        bgm = game.add.audio('bgm');
        bgm.loop = true;
        bgm.volume = .5;
        bgm.play();
        flapSound = game.add.audio('flapping');
        
        //character setup
        dragon = game.add.sprite(32, game.world.height - 150, 'sindra');
        game.physics.arcade.enable(dragon);
        dragon.body.bounce.y = 0.2;
        dragon.body.gravity.y = gravity;
        dragon.anchor.setTo(.5,.5);
        game.camera.follow(dragon);
        dragon.body.collideWorldBounds = true;
        dragon.scale.set(.75);
        
        dragon.animations.add('takeOffRight', [13, 14, 15, 16], 10, false);
        dragon.animations.add('flyRight', [17, 18, 19, 18], 10, false);
        dragon.animations.add('flyRightSlow', [17, 18, 19, 18], 5, false);
        dragon.animations.add('landRight', [20, 21, 22, 23, 24], 10, false);
        dragon.animations.add('takeOffLeft', [50, 49, 48, 47], 10, false);
        dragon.animations.add('flyLeft', [46, 45, 44, 45], 10, false);
        dragon.animations.add('flyLeftSlow', [46, 45, 44, 45], 5, false);
        dragon.animations.add('landLeft', [43, 42, 41, 40, 39], 10, false);
        dragon.animations.add('death', [26, 27, 28, 29, 30, 31], 10, false);
        
        
        var flap = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        flap.volume = .5;
        flap.onDown.add(flapWait, this);
        
        style = { font: "15px Arial", fill: "#ffffff", align: "center" };
        goal = game.add.text(16, 16, 'Look around, see if you can see any \nclues that might help you find your hatchling.', style);
        goal.fixedToCamera = true;
        
        game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
    }
    function update()
    {
        if(eventTrigger(dragon, prints) && printsDone == false)
        {
            goal.text = 'Look at this mess of footprints!\nYou are unable to discern what made the tracks,\nbut it looks like your home had unexpected company.\nTake to the air.  If it was another dragon (or he escaped)\nyou should be able to see him once you clear the trees.';
            printsDone = true;
        }
        
        if(eventTrigger(dragon, treeLine) && printsDone == true && treeLineDone == false)
        {
            goal.text = 'Nothing to see up here...\nMaybe you can try to smell something closer to the ground?';
            treeLineDone = true;
        }
        
        if(eventTrigger(dragon, blood) && printsDone == true && treeLineDone == true && bloodDone == false)
        {
            goal.text = '...This scent...\nHe was injured.\nYou still haven\'t caught the scent of another dragon.\nYou need to see what you can of the nearby town from above the edge of the forest.';
            bloodDone = true;
        }
        
        if(eventTrigger(dragon, view) && printsDone == true && treeLineDone == true && bloodDone == true && viewDone == false)
        {
            goal.text = 'It definitely looks like something has the town excited.\nYou\'re going to need to fly over.\nYou don\'t understand, why would the humans want your hatchling?\nYou\'ve always kept to yourself...';
            bloodDone = true;
        }
        
        if(dragon.body.onFloor())
        {
            if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
            {
                // Move to the left
                dragon.body.velocity.x = (0 - walkSpeed);
                dragon.animations.play('flyLeftSlow');
            }
            else if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
            {
                dragon.body.velocity.x = walkSpeed;
                dragon.animations.play('flyRightSlow');
            }
            else
            {
                if(dragon.body.velocity.x > 0)
                {
                    dragon.body.velocity.x -= 5;
                }
                else if (dragon.body.velocity.x < 0)
                {
                    dragon.body.velocity.x += 5;
                }
                
                // Stand still
                dragon.animations.stop();
                dragon.frame = 7;
            }
        }
        
        if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
        
        if (!dragon.body.onFloor())
        {
            // dragon.frame = 18;
            // dragon.animations.play('flyRight');
        }
         else if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
         {
            // dragon.frame = 45;
            // dragon.animations.play('flyLeft');
        }
        else if (!dragon.body.onFloor())
        {
            dragon.animations.stop();
            dragon.frame = 20;
        }
        
        if(dragon.body.velocity.x > 0)
        {
            dragon.body.velocity.x--;
        }
        else if (dragon.body.velocity.x < 0)
        {
            dragon.body.velocity.x++;
        }
    }
    
    function flapWait()
    {
        if(dragon.body.onFloor())
        {
            dragon.body.velocity.y = baseJump;
            dragon.animations.play('takeOffRight');
        } 
        
        if(dragon.body.velocity.y < 0)
        {
            dragon.body.velocity.y += flapHeight;
            if(dragon.body.velocity.y < flapHeight)
            {
                dragon.body.velocity.y = flapHeight;
            }
        }
        else
        {
            dragon.body.velocity.y = flapHeight;
        }
        flapSound = game.add.audio('flapping');
        flapSound.play();
        
        if(dragon.body.velocity.x > -flySpeed)
        {
            dragon.body.velocity.x -= 50;
            dragon.animations.play('flyLeft');
        }
        if(dragon.body.velocity.x < flySpeed)
        {
            dragon.body.velocity.x += 50;
            dragon.animations.play('flyRight');
        }
        
        if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
        {
            dragon.animations.play('flyLeft');
            
            if(dragon.body.velocity.x > -flySpeed)
            {
                dragon.body.velocity.x -= 50;
            }
        }
        if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
        {
            dragon.animations.play('flyRight');
            
            if(dragon.body.velocity.x < flySpeed)
            {
                dragon.body.velocity.x += 50;
            }
        }
    }
    
    function eventTrigger(spriteA, spriteB)
    {
        var boundsA = spriteA.getBounds();
        var boundsB = spriteB.getBounds();
    
        return Phaser.Rectangle.intersects(boundsA, boundsB);
    }
};
