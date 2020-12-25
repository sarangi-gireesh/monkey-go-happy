var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running;
var bananaImage, bananasGroup;
var obstacle, obstaclesGroup,obstacleImage;
var ground,invisibleGround;
var score;

function preload(){
  
monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup() {
  createCanvas(600, 200);
  
  score = 0;

  monkey = createSprite(50,90,20,50);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(200,180,600,20);
  ground.x = ground.width /2;
  
  invisibleGround = createSprite(200,178,600,10);
  invisibleGround.visible = false;
  
  obstaclesGroup = new Group();
  bananasGroup = new Group();
}

function draw() {
 background(180);
  
  text("Survival Time: "+ score, 500,50);
  
  if(gameState === PLAY){
  score = score + Math.round(getFrameRate()/60);
  
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
   
    spawnBananas();
    spawnObstacles();
    
  if(keyDown("space")&& monkey.y >= 100) {
    monkey.velocityY = 10;
    }
    
    monkey.velocityY = monkey.velocityY + 0.8
    
    if(obstaclesGroup.isTouching(monkey)){
        gameState = END;
    }
    
    else if (gameState === END) {
      ground.velocityX = 0;
      monkey.velocityY = 0;
      score = 0;
      reset();
     // obstaclesGroup.setLifetimeEach(-1);
     // bananasGroup.setLifetimeEach(-1);
     
    // obstaclesGroup.setVelocityXEach(0);
     //bananasGroup.setVelocityXEach(0); 
    }
  }
   monkey.collide(invisibleGround);
   
   drawSprites();
  
  
}

function spawnBananas() {
  
  if (frameCount % 80 === 0) {
    var bananas = createSprite(600,500,40,10);
    bananas.y = Math.round(random(50,200));
    bananas.addImage(bananaImage);
    bananas.scale = 0.1;
    bananas.velocityX = -3;
    
    bananas.lifetime = 400;
    bananas.depth = monkey.depth;
    bananas.depth = monkey.depth + 1;
    
    bananasGroup.add(bananas);
  }
}


function reset(){

  obstaclesGroup.destroyEach();
  bananasGroup.destroyEach();
  score = 0;
  monkey.changeAnimation("running",monkey_running);
}

function spawnObstacles() {
  
  if (frameCount % 300 === 0) {
    var obstacles = createSprite(100,165,10,10);
    obstacles.x = Math.round(random(120,200));
    obstacles.addImage(obstacleImage);
    obstacles.scale = 0.1;
    obstacles.velocityX = -3;
    
    obstacles.lifetime = 400;
    obstaclesGroup.add(obstacles);
  }
}





