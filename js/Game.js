class Game {
    constructor() {}

    getState() {
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value", function(data) {
            gameState = data.val();
        })
    }

    update(state) {
        database.ref('/').update({
            gameState: state
        });
    }


    async start() {
        if (gameState === 0) {
            player = new Player();
            var playerCountRef = await database.ref('playerCount').once("value");
            if (playerCountRef.exists()) {
                playerCount = playerCountRef.val();
                player.getCount();
            }

            form = new Form()
            form.display();
        }
        runner1 = createSprite(10, 200);
        runner1.scale = 1;
       
        
        runner1.addAnimation("runner1", runner1_img);
        
        runners=[runner1]
        invisibleGround = createSprite(1, 480, displayWidth * 5, 20);
       invisibleGround.visible=false;

    


    }
    play() {
        form.hide();
        Player.getPlayerInfo();
        spawnObstacles();
      



        // Player.getPlayersAtEnd();

        if (allPlayers !== undefined) {
            image(track, 0, -20, displayWidth * 5, displayHeight);

         
            var index = 0;
            
            var y = 140;
            var x = 50;


         
           

            for (var plr in allPlayers) {
                index = index + 1;


                y = y + 260;
                //use data form the database to display the cars in x direction
                x = 360 - allPlayers[plr].distance;

                runners[index - 1].x = x;
                runners[index - 1].y = y;
               
                runners[index-1].collide(invisibleGround);
                if (index === player.index) {
                    // console.log("yes")
                    stroke(10);
                    fill("red");
                    ellipse(x, y, 60, 60);
                    runners[index - 1].shapeColor = "red";
                    camera.position.x = runners[index - 1].x;
                    camera.position.y = runners[index - 1].y;
                    player.x = x;
                    player.y = y;


                    if (keyDown("space")) {
                       
                        runners[index - 1].y -= 50;

                    }
                



                }





                if (keyIsDown(RIGHT_ARROW) && player.index !== null) {
                    player.distance -= 10
                    player.update();
                }
            }

        }







        if (player.distance === -5790) {
            gameState = 2;
            player.rank += 1
            Player.updatePlayersAtEnd(player.rank)
        }
       

        drawSprites();
    }

    end() {
        alert("Game Ended And Rank is : "+player.rank);
        
    }
   
}

function spawnObstacles() {
    var i = 0;
    if (frameCount % 300 === 0) {
        i = i + 1000
        var obstacle = createSprite(4000, 425);

        obstacle.velocityX = -4;
        obstacle.addImage(hurdle);

        obstacle.scale = 0.80;
        obstacle.lifetime = 800;
        obstacle.setCollider("rectangle", -10, 0, 90, 150);
        
    }
}

