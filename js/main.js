window.onload = function() 
{
    // You might want to start with a template that uses GameStates:
    //     https://github.com/photonstorm/phaser/tree/master/resources/Project%20Templates/Basic
    
    "use strict";
    
    var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );

    var people;
    var blkCat;
    var arrow;
    var reunited;
    var map;
    var background;
    var x;
    var y;
    var arrShoot;
    var counter = 0;
    var humans = 0;
    var cats = 0;
    var couples = 0;
    var kittens = 0;
    var catPeople = 0;
    
    function preload() 
    {
        game.load.spritesheet('blkCat', 'assets/blkCatJump.png', 32, 32, 15);
        game.load.spritesheet('characters', 'assets/characters.png', 37, 40, 15)
        game.load.image('arrow', 'assets/arrowRight.png');
        game.load.image('grass', 'assets/grass.png');
        game.load.image('BG', 'assets/grassyBG.png');
        game.load.tilemap('map', 'assets/vDayBG.json', null, Phaser.Tilemap.TILED_JSON);
        
        game.load.audio('reunited', 'assets/Reunited1.mp3');
    }
    
    
    function create() 
    {
        game.world.setBounds(0, 0, 800, 600);
        game.physics.startSystem(Phaser.Physics.ARCADE);
        background = game.add.sprite(0,0, 'BG');
        
        //playing music
        reunited = game.add.audio('reunited');
        reunited.loop = true;
        reunited.play();
        
        people = game.add.group();
        game.physics.arcade.enable(people);
        people.enableBody = true;
        people.physicsBodyType = Phaser.Physics.ARCADE;
    //    people.body.allowRotation = false;
    //    people.body.collideWorldBounds = true;
        // allows mouse clicks
    //    background.events.onInputDown.add(arrowRelease, this);
        
        for (var i = 0; i < 20; i++)
        {
            var c = people.create(game.rnd.integerInRange(100, 770), game.rnd.integerInRange(0, 570), 'characters', game.rnd.integerInRange(0, 14));
            c.name = 'char' + i;
            c.body.immovable = true;
            c.inputEnabled = true;
            c.scale.set(2);
            
            c.events.onInputDown.add(arrowRelease, this);
        }
        
        /*blkCat = game.add.sprite(32, game.world.height - 150, 'blkCat');
        game.physics.arcade.enable(blkCat);
        blkCat.body.bounce.y = 0.2;
        blkCat.body.collideWorldBounds = true;
        //girl.scale.set(2);*/
        
    /*    arrow = game.add.sprite(game.world.centerX, game.world.centerY, 'arrow');
        game.physics.arcade.enable(arrow);
        arrow.enableBody = true;
        arrow.physicsBodyType = Phaser.Physics.ARCADE;
        arrow.body.allowRotation = false; */
        
        
        blkCat.animations.add('left', [0, 1, 2], 10, true);
        blkCat.animations.add('right', [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], 10, true); 
        
       //blkCat.animations.play('right', 10, true);


       game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
        
    }
    
    function update() 
    {
        game.physics.arcade.collide(arrow, people, collisionHandler, null, this);
        game.physics.arcade.collide(people, people);
        
     }
     
     function arrowCreate()
     {
        arrow = game.add.sprite(game.world.centerX, game.world.centerY, 'arrow');
        game.physics.arcade.enable(arrow);
        arrow.enableBody = true;
        arrow.physicsBodyType = Phaser.Physics.ARCADE;
        arrow.body.allowRotation = false; 
        arrow.scale.set(.25);
        
        arrow.events.onInputDown.add(arrowRelease, this);
     }
     
     function arrowRelease(target)
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
    }
     
};
