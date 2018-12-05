var pen;
var canvas;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight-35);
  P5JsSettings.init();

  pen = new SnowflakePen(width/2, height/2);

  stroke(200, 200, 250);
  background(50);
}

function draw(){
  pen.draw();
}

function keyTyped(){
  if (key == 'p'){
    saveCanvas(canvas, 'screenshot', 'png');
  } else if (key == 'c'){
    background(50);
  }
}
