var ZoroImg
var BlackbeardImg;
var FruitImg; 
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var invisibleGround, groundImage;
var score;
var gameOverImg,restartImg
var jumpSound , checkPointSound, dieSound
 
 


function preload(){
    laughSound = loadSound("laugh.mp3")
    ZoroImg = loadImage("run.jpeg")
    ZoroslashImg = loadImage("zoro.png")
    BlackbeardImg = loadImage("blackbeard.png")
    FruitImg = loadImage("fruit.jpg")
    groundImage = loadImage("ground2.png")
    restartImg = loadImage("restart.png")
    gameOverImg = loadImage("gameOver.png")
    jumpSound = loadSound("jump.mp3")
    dieSound = loadSound("die.mp3")
    checkPointSound = loadSound("checkPoint.mp3")
}

function setup() {
  
    createCanvas(1000,800);
    
    Zoro = createSprite(100,190,10,10);
    Zoro.addImage(ZoroslashImg);
    Zoro.addImage(ZoroImg);
    

    Zoro.scale = 0.15;
    Zoro.setCollider('circle',0,0,350)
    Zoro.debug = false;
    
    ground = createSprite(200,180,400,20);
    ground.addImage("ground",groundImage);
    ground.x = ground.width /2;

    gameOver = createSprite(500,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(500,140);
  restart.addImage(restartImg);
  
 
  gameOver.scale = 0.5;
  restart.scale = 0.5;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  BlackbeardGroup = createGroup();
  FruitsGroup = createGroup();

  score = 0;
   
}
    if (gameState===PLAY){
       spawnBlackbeard();
       spawnFruit();
}

function draw() { 

  background(1000);
 
  text("Score: "+ score, 470,50);

  if(gameState === PLAY){

    gameOver.visible = false;
    restart.visible = false;
    
    ground.velocityX = -(4 + 3* score/100)
    score = score + Math.round(getFrameRate()/60);
    
    if(score>0 && score%100 === 0){
       checkPointSound.play() 
    }
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    if(keyDown("space")&& Zoro.y >= 100) {
        Zoro.velocityY = -12;
        jumpSound.play();
    }
    if (keyDown("down")&& BlackbeardGroup.x> 150) {
      BlackbeardGroup.destroyEach();
    }

    Zoro.velocityY = Zoro.velocityY + 0.5;
    
    spawnBlackbeard();
    spawnFruit();
    
    
    if(BlackbeardGroup.isTouching(Zoro)){

        laughSound.play()
        gameState = END;
    }

    

  
  }

  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
  
    ground.velocityX = 0;
    Zoro.velocityY = 0;
    
   
    BlackbeardGroup.setLifetimeEach(-1);
   
    BlackbeardGroup.setVelocityXEach(0);    
    FruitsGroup.setLifetimeEach(-1);
   
    FruitsGroup.setVelocityXEach(0); 
 }

Zoro.collide(invisibleGround);

if(mousePressedOver(restart)) {
    reset();
  }

  if(FruitsGroup.isTouching(Zoro)){
    score = score + 2;
  }


drawSprites();
}



function reset(){
gameState = PLAY;
gameOver.visible = false;
restart.visible = false;
BlackbeardGroup.destroyEach();
FruitsGroup.destroyEach();

score = 0;
}


function spawnBlackbeard(){
if (frameCount % 100===0) {
 Blackbeard = createSprite(1000,130,10,40);
 Blackbeard.velocityX = -(6 + score/100);
 Blackbeard.addImage(BlackbeardImg)
          
  Blackbeard.scale = 0.12
  
  Blackbeard.lifetime = 300;
 
  BlackbeardGroup.add(Blackbeard);
}
}
    function spawnFruit() {
      if (frameCount % 250 === 0) {
        fruit = createSprite(1000,130,40,10);
        fruit.velocityX =-(6 + score/100);
        fruit.addImage(FruitImg);
        fruit.scale = 0.2;
        
        fruit.lifetime = 300;
        
        fruit.depth = Zoro.depth;
        Zoro.depth = Zoro.depth + 1;
        
        FruitsGroup.add(fruit);
        
      }
  }
  