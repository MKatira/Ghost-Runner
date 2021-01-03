var tower;
var door;
var ghost;
var gamestate = "play";
var spookySounds;

function preload() {
  towerImage = loadImage("tower.png");
  doorImage = loadImage("door.png");
  climberImage = loadImage("climber.png");
  ghostImage = loadImage("ghost-standing.png");
  spookySounds = loadSound("spooky.wav");
}

function setup() {

  createCanvas(600, 600)
  tower = createSprite(300, 300, 600, 600);
  tower.addImage(towerImage);

  tower.velocityY = 2

  doorsGroup = new Group();
  climbersGroup = new Group();
  climbers2Group = new Group();
  
  //climbers2Group.debug = true

  ghost = createSprite(300, 300, 40, 40);
  ghost.addImage(ghostImage);
  ghost.scale = 0.4
 //ghost.debug = true
  
}

function draw() {
  background("black");

  if (gamestate === "play") {

    if (tower.y > 400) {
      tower.y = 300
    }
    if (keyDown("left")) {
      ghost.x = ghost.x - 3;
    }
    if (keyDown("right")) {
      ghost.x = ghost.x + 3;
    }
    if (keyDown("space") || keyDown("up")) {
      ghost.velocityY = ghost.velocityY - 1.5;
    }
    ghost.velocityY = ghost.velocityY + 0.5;
    if (ghost.isTouching(climbersGroup)) {
      ghost.velocityY = 0
    }
    if (ghost.isTouching(climbers2Group)) {
      gamestate = "end";
    }
    if (ghost.y > 600) {
      gamestate = "end";
    }
    spawnDoors();
    drawSprites();
    spookySounds.play();
    spookySounds.setVolume(0.01);
  }

if (gamestate === "end") {
  textSize(20);
  text ("GAME OVER",250,300);
}


  

  
}

function spawnDoors() {
  if (frameCount % 200 === 0) {
    door = createSprite(300, 40, 40, 40);
    door.addImage(doorImage);
    door.velocityY = 2
    door.x = Math.round(random(100, 500));
    door.lifetime = 300
    doorsGroup.add(door);
    climber = createSprite(300, 110, 40, 40);
    climber.addImage(climberImage);
    climber.x = door.x;
    climber.velocityY = 2
    climber.lifetime = 300
    climbersGroup.add(climber);
    climber2 = createSprite(300, 120, 60, 20);
    climber2.x = climber.x
    climber2.visible = false
    climber2.velocityY = 2
    climber2.lifetime = 300
    climbers2Group.add(climber2);

    door.depth = ghost.depth;
    ghost.depth = ghost.depth + 1;
  }

}