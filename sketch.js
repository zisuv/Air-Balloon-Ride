var balloon,balloonImg;
var background,backgroundImg;

function preload() {
  balloonImg = loadAnimation("Hot Air Ballon-01.png","Hot Air Ballon-02.png","Hot Air Ballon-03.png");
  backgroundImg = loadImage("BG.png");
  

}

function setup() {
  database = firebase.database();
  createCanvas(800,400);

  balloon = createSprite(250,100,20,20);
  balloon.addAnimation("balloon",balloonImg);
  balloon.scale = 0.3;
  
}

function draw() {
  background(backgroundImg,"Background"); 

  fill("black");
  text("Use Arrow Keys to move the Balloon!",10,30);


  


  if(keyDown(LEFT_ARROW)){
    balloon.x = balloon.x - 10;
    }
else if(keyDown(RIGHT_ARROW)){
    balloon.x = balloon.x + 10;
}
else if(keyDown(UP_ARROW)){
    balloon.y = balloon.y - 10;
    balloon.scale = 0.35;
}
else if(keyDown(DOWN_ARROW)){
    balloon.y = balloon.y + 10;
    balloon.scale = 0.25;
  }


  var balloonPosition = database.ref('balloon/position')
  balloonPosition.on("value",readvalue,showError);

  drawSprites();
}

function changePosition(x,y){
  balloon.x = balloon.x + x;
  balloon.y = balloon.y + y;
}

function readvalue(data) {
  position = data.val();

  balloon.x = position.x;
  balloon.y = position.y;

}

function updateHeight(x,y){
  database.ref('balloon/height').set({
    'x': height.x+x,
    'y': height.y+y
  })
}

function readHeight(data){
  height = data.val();
  balloon.x = height.x;
  balloon.y = height.y;
}

function showError() {
  console.log("Error is coming  to Database");
}


