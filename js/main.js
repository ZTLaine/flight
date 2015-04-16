function Game() {};

Game.prototype =
{
    start: function()
    {
        var game = new Phaser.Game(800, 600, Phaser.AUTO, "game");
        
        /* Add game states */
        game.state.add("boot", BootState);
        game.state.add("preload", PreloadState);
        game.state.add("intro", IntroState);
        game.state.add("play", PlayState);
//        game.state.add("game over", GameOverState);
        
        game.state.start("boot");
    }
};

window.onload = function() 
{
    "use strict";
    
    var game = new Game();
    game.start();

}
