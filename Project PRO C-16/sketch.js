var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running,monkeyJump;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var hunger = 10;
var ground,invisibleGround;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  monkeyJump = loadImage("sprite_1.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,600);
  monkey = createSprite(70,500,10,10);  
  monkey.addAnimation("walking",monkey_running);
  monkey.scale = 0.15;
  ground = createSprite(300,575,600,5);
  invisibleGround = createSprite(300,580,600,5);
  
  FoodGroup = createGroup();
  obstacleGroup = createGroup();
}


function draw() {
  background("white");
  text("Survival Time:"+score,300,20);
  text("Hunger:" + hunger,500,20);
  monkey.collide(invisibleGround);
  invisibleGround.visible = false;
  monkey.velocityY = monkey.velocityY + 0.8;
  monkey.setCollider("circle",0,0,300)
  monkey.debug = true;
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  if(gameState == PLAY){
    score = Math.round(World.frameCount/20);
    if(keyDown("space") && monkey.y > 525){
      monkey.velocityY = -15;
      monkey.addImage(monkeyJump);
    }
    bananas();
    obstacles();
    if(World.frameCount%50 == 0 && hunger > 0){
      hunger = hunger - 0.5;
    }
    if(monkey.isTouching(FoodGroup)){
      FoodGroup.destroyEach();
      hunger = hunger + 1;
    }
    if(monkey.isTouching(obstacleGroup) || hunger == 0){
      gameState = END;
    }
  } else if(gameState == END){
      monkey.visible = false;
      obstacleGroup.destroyEach();
      FoodGroup.destroyEach();
      text("Game Over!",250,300);
      
    }
  drawSprites();
}
function bananas(){
  if(World.frameCount%100 == 0){
    var rand = Math.round(random(400,450));
    banana = createSprite(600,rand,10,10);
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -7;
    banana.lifetime =100;
    FoodGroup.add(banana);
  }
}
function obstacles(){
  if(World.frameCount%150 == 0){
    obstacle = createSprite(600,530,10,10);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.25;
    obstacle.velocityX = -7;
    obstacle.lifetime = 150;
    obstacleGroup.add(obstacle);
  }
}





