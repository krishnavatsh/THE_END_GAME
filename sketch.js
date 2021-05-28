var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;

var runner1,runners,obstacleGroup;

var track, runner1_img, hurdle, invisibleGround;

function preload() {
    hurdle = loadImage("images/hurdle1.png");
    track = loadImage("images/123.jpg");
    runner1_img = loadAnimation("b.png", "p.png", "y.png");
    
}

function setup() {
    canvas = createCanvas(displayWidth, window.innerHeight);
    database = firebase.database();
    game = new Game();
    game.getState();
    game.start();
    obstacleGroup= new Group()
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
    if(gameState === 3){
        game.lost()
    }
   
}
