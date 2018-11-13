var system;
var systemViewer;

function setup(){
  createCanvas(windowWidth, windowHeight-40);
  system = new LSystem('F', 'FF[+F]-F+F');
  systemViewer = new LSystemViewer();

  stroke(255);
}  

function draw(){
  background(50);
  systemViewer.draw(system);
}

function keyPressed(){
  if (keyCode === RIGHT_ARROW) {
    system.step();
  }
}
