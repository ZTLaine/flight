window.onload = function() 
{
    // You might want to start with a template that uses GameStates:
    //     https://github.com/photonstorm/phaser/tree/master/resources/Project%20Templates/Basic
    
    "use strict";
    
    var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );

    var dragon;
    var walkSpeed = 150;
    var flySpeed = 250;
    var baseJump = -100;
    var flap = -150;
    var facing = "right";
    
    var reunited;
    var bgm;
    var flap;
    var map;
    var background;
    
    function preload() 
    {
        game.load.spritesheet('sindra', 'assets/dragonProtag1.png', 200, 150, 52);
        
        game.load.image('grass', 'assets/grass.png');
        game.load.image('BG', 'assets/grassyBG.png');
        game.load.image('forest', 'assets/forest_background_by_jbjdesigns-d5mgjm3.png');
        game.load.tilemap('map', 'assets/flightForest.json', null, Phaser.Tilemap.TILED_JSON);
        
        game.load.audio('reunited', 'assets/Reunited.mp3');
    //    game.load.audio('flap', 'assets/flap.mp3');
    //    game.load.audio('bgm', 'assets/DeathIsJustAnotherPath.mp3');
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
        
        //playing music
    //    bgm = game.add.audio('bgm');
    //    flap = game.add.audio('flap');
    //    bgm.loop = true;
    //    bgm.play();
        
        dragon = game.add.sprite(32, game.world.height - 150, 'sindra');
        game.physics.arcade.enable(dragon);
        dragon.body.bounce.y = 0.2;
        dragon.body.gravity.y = 1000;
        dragon.anchor.setTo(.5,.5);
        game.camera.follow(dragon);
        dragon.body.collideWorldBounds = true;
        dragon.scale.set(.75);
        
        dragon.animations.add('takeOffRight', [13, 14, 15, 16], 10, false);
        dragon.animations.add('flyRight', [17, 18, 19], 10, false);
        dragon.animations.add('landRight', [20, 21, 22, 23, 24], 10, false);
        dragon.animations.add('takeOffLeft', [50, 49, 48, 47], 10, false);
        dragon.animations.add('flyLeft', [46, 45, 44], 10, false);
        dragon.animations.add('landLeft', [43, 42, 41, 40, 39], 10, false);
        dragon.animations.add('death', [26, 27, 28, 29, 30, 31], 10, false);

       game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
        
    }
    
    function update() 
    {
        //game.physics.arcade.collide(arrow, people, collisionHandler, null, this);
        //game.physics.arcade.collide(people, people);
        dragon.body.velocity.x = 0;
        
        if(dragon.body.onFloor())
        {
            if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
            {
                // Move to the left
                dragon.body.velocity.x = (0 - walkSpeed);
                dragon.animations.play('flyLeft');
            }
            else if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
            {
                dragon.body.velocity.x = walkSpeed;
                dragon.animations.play('flyRight');
            }
            else if (game.input.keyboard.isDown(Phaser.Keyboard.UP) && dragon.body.onFloor() && game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
            {
                dragon.body.velocity.x = 0 - walkSpeed;
                dragon.body.velocity.y = baseJump;
                dragon.animations.play('takeOffLeft');
            }
            else if (game.input.keyboard.isDown(Phaser.Keyboard.UP) && dragon.body.onFloor())
            {
                dragon.body.velocity.x = walkSpeed;
                dragon.body.velocity.y = baseJump;
                dragon.animations.play('takeOffRight');
            }
            else
            {
                // Stand still
                dragon.animations.stop();
                dragon.frame = 7;
            }
        }
        
        if (game.input.keyboard.isDown(Phaser.Keyboard.UP) && game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
        {
            flap.play();
            dragon.body.velocity.y = flap;
            dragon.animations.play('flyRight');
            dragon.body.velocity.x = flySpeed;
        }
        else if(game.input.keyboard.isDown(Phaser.Keyboard.UP) && game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
        {
            flap.play();
            dragon.body.velocity.y = flap;
            dragon.animations.play('flyLeft');
            dragon.body.velocity.x = -flySpeed;
        }
        else (!dragon.body.onFloor())
        {
            dragon.animations.stop();
            dragon.frame = 20;
        }
   
     }
     
};
