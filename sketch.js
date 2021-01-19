var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;

var runner1,runners;

var track, runner1_img, hurdle, invisibleGround;

function preload() {
    hurdle = loadImage("../images/hurdle.png");
    track = loadImage("../images/123.jpg");
    runner1_img = loadAnimation("b.png", "p.png", "y.png");
    
}

function setup() {
    canvas = createCanvas(displayWidth, window.innerHeight);
    database = firebase.database();
    game = new Game();
    game.getState();
    game.start();
}


function draw() {
    if (playerCount === 1) {
        game.update(1);
    }
    if (gameState === 1) {
        clear();
        game.play();
    }
    if (gameState === 2) {
        game.end();
    }
   
}