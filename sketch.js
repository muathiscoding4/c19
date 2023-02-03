var space,ASTRO;
var rock1,rock2,comet2;
var spaceImg,ASTROImg,ExplosionImg;

var rock1Img,comet2Img,rock2Img;
var gameoverImg;


var PLAY = 1;
var END  = 0;
var gameState = PLAY;

var distance = 0;
var gameover, restart;

function preload(){
spaceImg = loadImage("space.2.png");
ASTROImg = loadImage("ASTROFLY.png");
ExplosionImg = loadImage("death.png");
rock1Img = loadImage("rock1.png");
rock2Img = loadImage("rock2.png");
comet2Img = loadImage("comet2.png");
gameoverImg = loadImage("gameover.png");
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    space=createSprite(200,150);
    space.addImage(spaceImg);
    space.velocityX = -5;

    ASTRO = createSprite(70,150);
    ASTRO.addImage(ASTROImg);
    ASTRO.scale= 0.7;

    ASTRO.setCollider("rectangle",0,0,40,40)
 
    gameover = createSprite(300,200);
    gameover.addImage(gameoverImg);
    gameover.scale = 1;
    gameover.visible = false; 
    rock1G = new Group();
    rock2G = new Group();
    comet2G = new Group();
}

function draw() {
    background(0);
  
    drawSprites();
    textSize(20);
    fill(255);
    text("Distance: "+ distance,900,30);

    if(gameState===PLAY){
    
        distance = distance + Math.round(getFrameRate()/50);
        space.velocityX = -(6 + 2*distance/150);
       
        ASTRO.y = World.mouseY;
       
        edges= createEdgeSprites();
        ASTRO.collide(edges);
       
       //code to reset the background
       if(space.x < 20 ){
         space.x = width/4;
       }
       var select_oppPlayer = Math.round(random(1,3));
  
  if (World.frameCount % 150 == 0) {
    if (select_oppPlayer == 1) {
      rock1();
    } else if (select_oppPlayer == 2) {
      rock2();
    } else {
      comet2();
    }
  }
  if(rock1G.isTouching(ASTRO)){
    gameState = END;
    player1.velocityY = 0;
    player1.addAnimation("Explosion1",ExplosionImg);
   }
   
   if(rock2G.isTouching(ASTRO)){
     gameState = END;
     player2.velocityY = 0;
     player2.addAnimation("Explosion2",ExplosionImg);
   }
   
   if(comet2G.isTouching(ASTRO)){
     gameState = END;
     player3.velocityY = 0;
     player3.addAnimation("Explosion3",ExplosionImg);
   }
   else if (gameState === END) {
    gameover.visible = true;
    textSize(20);
    fill(255);
    text("Press Up Arrow to Restart the game!", 500,200);
  
    space.velocityX = 0;
    ASTRO.velocityY = 0;
    ASTRO.addAnimation(ExplosionImg);
  
    rock1G.setVelocityXEach(0);
    rock1G.setLifetimeEach(-1);
  
    rock2G.setVelocityXEach(0);
    rock2G.setLifetimeEach(-1);
  
    comet2G.setVelocityXEach(0);
    comet2G.setLifetimeEach(-1);

     if(keyDown("UP_ARROW")) {
       reset();
     }
}
}
}
function rock1(){
    player1 =createSprite(1100,Math.round(random(50, 250)));
    player1.scale =0.09;
    player1.velocityX = -(6 + 2*distance/150);
    player1.addImage("Explosion1",rock1Img);
    player1.setLifetime=170;
    rock1G.add(player1);
}
function rock2(){
    player2 =createSprite(1100,Math.round(random(50, 250)));
    player2.scale =0.09;
    player2.velocityX = -(6 + 2*distance/150);
    player2.addImage("Explosion2",rock2Img);
    player2.setLifetime=170;
    rock2G.add(player2);
}
function comet2(){
    player3 =createSprite(1100,Math.round(random(50, 250)));
    player3.scale =0.5;
    player3.velocityX = -(6 + 2*distance/150);
    player3.addImage("Explosion3",comet2Img);
    player3.setLifetime=170;
    comet2G.add(player3);
}
function reset(){
    gameState = PLAY;
    gameover.visible = false;
    Astro.addAnimation(ASTROImg);
    
    rock1.destroyEach();
    rock2.destroyEach();
    comet2.destroyEach();
    
    distance = 0;
   }