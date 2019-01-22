var system;

function setup() {
  createCanvas(500, 500);
  P5JsSettings.init();

  let rect = new Rect(0, 0, width, height);
  system = new System(rect);

  noStroke();
}

function draw(){
  fill(0, 50);
  rect(0, 0, width, height);
  system.tick();
  system.draw();
}

function keyTyped(){
  system.handleKeyTyped();
}

function mousePressed(){
  system.handleMousePressed();
}

function mouseReleased(){
  system.handleMouseReleased();
}
