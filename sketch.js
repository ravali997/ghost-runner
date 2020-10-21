
var tower,towerimage;
var ghost,ghost_running;
var door,doorimage;
var climber,climberimage;
var invisibleblock,invisiblegroup;
var doorgroup,climbergroup;
var gamestate="play";
var sound;


function preload(){

towerimage=loadImage("tower.png");  

  
ghost_running=loadImage("ghost-standing.png")  

  
doorimage=loadImage("door.png"); 
  
climberimage=loadImage("climber.png") ;
 
sound=loadSound("spooky.wav");  
  
}

function setup(){
createCanvas(500,500);  
 
sound.loop();   
  
tower=createSprite(250,250,10,10);  
tower.addImage(towerimage);
tower.velocityY=5  

ghost=createSprite(250,250,10,10);  
ghost.addImage(ghost_running);
ghost.scale=0.4;  
   
doorgroup=new Group();  
climbergroup=new Group();
invisiblegroup=new Group();  
  
}

function draw(){
background(220);  
 
console.log(frameCount);  
  
if(gamestate=="play"){  
if(tower.y>500){
   tower.y=250;
} 

  
if(keyDown("space")){
   ghost.velocityY=-8; 
}  

ghost.velocityY=ghost.velocityY+0.5;  
  
if(keyDown("right")){
   ghost.x=ghost.x+3
}  
  
if(keyDown("left")){
   ghost.x=ghost.x-3
}
  
if(ghost.isTouching(climbergroup)){
   ghost.velocityY=0;  
}
  
if(ghost.isTouching(invisiblegroup) || ghost.y>500){
   ghost.destroy();
   gamestate="end"
}  
  
balcony(); 
  
drawSprites();
  
}
  
  
  

if(gamestate=="end"){
   background("black");
   textSize(50);
   fill("yellow");
   text("GAME OVER",100,250)
   
  
  
}  
  
  
}

function balcony(){
  
if(frameCount%100==0){
   door=createSprite(10,-20,10,10)
   door.addImage(doorimage);
   door.velocityY=3;
   door.x=Math.round(random(50,450))
   door.lifetime=200;
   doorgroup.add(door); 
  
   climber=createSprite(50,30,10,10)
   climber.addImage(climberimage)
   climber.velocityY=3;
   climber.x=door.x;
   climber.lifetime=200;
   climbergroup.add(climber);
   
   invisibleblock=createSprite(20,45,100,5)  
   invisibleblock.visible=false;
   invisibleblock.velocityY=3  
   invisibleblock.x=climber.x;
   invisibleblock.lifetime=200;
   invisiblegroup.add(invisibleblock)
  
   ghost.depth=door.depth;
   ghost.depth=ghost.depth+1;
  
}  
   
}