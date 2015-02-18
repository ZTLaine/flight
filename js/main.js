window.onload = function() 
{
    // You might want to start with a template that uses GameStates:
    //     https://github.com/photonstorm/phaser/tree/master/resources/Project%20Templates/Basic
    
    "use strict";
    
    var game = new Phaser.Game(3200, 1824, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );

    var people;
    var dragon;
    var walkSpeed = 150;
    var flySpeed = 250;
    var baseJump = -100;
    var flap = -150;
    var facing = "right";
    
    var reunited;
    var map;
    var background;
    
    function preload() 
    {
        game.load.spritesheet('sindra', 'assets/dragonProtag.png', 200, 150, 39);
        
        game.load.image('grass', 'assets/grass.png');
        game.load.image('BG', 'assets/grassyBG.png');
        
        game.load.audio('reunited', 'assets/Reunited1.mp3');
    }
    
    
    function create() 
    {
        game.world.setBounds(0, 0, 3200, 1824);
        game.physics.startSystem(Phaser.Physics.ARCADE);
        background = game.add.sprite(0,0, 'BG');
        game.stage.backgroundColor = '#2d2d2d';
        
        //playing music
        reunited = game.add.audio('reunited');
        reunited.loop = true;
        reunited.play();
        
        dragon = game.add.sprite(32, game.world.height - 150, 'sindra');
        dragon.physics.arcade.enable(dragon);
        dragon.body.bounce.y = 0.2;
        dragon.body.gravity.y = 1000;
        dragon.anchor.setTo(.5,.5);
        dragon.body.collideWorldBounds = true;
        //dragon.scale.set(2);
        
        dragon.animations.add('takeOffRight', [14, 15, 16], 10, false);
        dragon.animations.add('flyRight', [17, 18, 19], 10, false);
        dragon.animations.add('landRight', [20, 21, 22, 23, 24], 10, false);
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
                dragon.scale.x *= -1;
                dragon.body.velocity.x = (0 - walkSpeed);
                dragon.animations.play('flyRight');
                dragon.facing = "left";
            }
            else if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
            {
                dragon.body.velocity.x = walkSpeed;
                dragon.animations.play('flyRight');
                dragon.facing = "right";
            }
            else if (game.input.keyboard.isDown(Phaser.Keyboard.UP) && dragon.body.onFloor() && game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
            {
                dragon.body.velocity.x = walkSpeed;
                dragon.body.velocity.y = baseJump;
                dragon.scale.x *= -1;
                dragon.animations.play('takeOffRight');
                dragon.facing = "left";
            }
            else if (game.input.keyboard.isDown(Phaser.Keyboard.UP) && dragon.body.onFloor())
            {
                dragon.body.velocity.x = walkSpeed;
                dragon.body.velocity.y = baseJump;
                dragon.animations.play('takeOffRight');
                dragon.facing = "right";
            }
            else
            {
                // Stand still
                dragon.animations.stop();
                dragon.frame = 7;
            }
        }
        
        if (game.input.keyboard.isDown(Phaser.Keyboard.UP))
        {
            dragon.body.velocity.y = flap;
            
            if(dragon.facing == "right")
            {
                dragon.animations.play('flyRight');
                dragon.body.velocity.x = flySpeed;
            }
            if(dragon.facing == "left")
            {
                dragon.scale.x *= -1;
                dragon.animations.play('flyRight');
                dragon.body.velocity.x = -flySpeed;
            }
        }
        else
        {
            dragon.animations.stop();
            dragon.frame = 20;
        }
       
    //    if (game.input.keyboard.isDown(Phaser.Keyboard.UP))
    //    {
    //        dragon.body.velocity.y = -350;
    //    }

        
     }
     
    /* function arrowRelease(target)
     {
        arrow = game.add.sprite(game.world.centerX, game.world.centerY, 'arrow');
        game.physics.arcade.enable(arrow);
        arrow.enableBody = true;
        arrow.physicsBodyType = Phaser.Physics.ARCADE;
        arrow.body.allowRotation = false; 
        arrow.scale.set(.9);
        
        x = game.input.mousePointer.x;
        y = game.input.mousePointer.y;
        arrow.rotation = game.physics.arcade.moveToXY(arrow, x, y, 120);
        arrow.rotation = game.physics.arcade.angleBetween(arrow, target);
        
        arrShoot = game.add.tween(arrow.scale);
        arrShoot.to({x: .25, y: .25}, 1000);
        arrShoot.start();
     }
     
     function collisionHandler (arrow, people) 
    {
        if(people.frame == 12 || people.frame == 13 || people.frame == 14)
        {
            cats++;
            counter++;
        }
        else
        {
            humans++;
            counter++;
        }
        if(counter%2 == 0)
        {
            if(cats == 2)
            {
                kittens++;
                cats = 0;
            }
            else if(humans == 2)
            {
                couples++;
                humans = 0;
            }
            else if(cats == 1 && humans ==1)
            {
                catPeople++;
                cats = 0;
                humans = 0;
            }
        }
        people.kill();
        arrow.kill();
    } */
     
};
