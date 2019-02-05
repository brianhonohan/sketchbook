var system;
var rectToDrag;

function setup() {
  createCanvas(500, 500);
  P5JsSettings.init();

  rectToDrag = new Rectangle(50, 50, 200, 200);
  rectToDrag.dragEnabled = true;
}

function draw(){
  background(50);

  fill(80);
  noStroke();
  rectToDrag.draw();
}
