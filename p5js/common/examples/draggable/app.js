var system;
var rectToDrag;

function setup() {
  createCanvas(500, 500);
  P5JsSettings.init();

  rectToDrag = new Rect(50, 50, 200, 200);
}

function draw(){
  background(50);

  fill(80);
  noStroke();
  P5JsUtils.drawRect(rectToDrag);
}
