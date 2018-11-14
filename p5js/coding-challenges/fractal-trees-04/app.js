var system;
var systemViewer;
var visualScale;
var log10 = Math.log(10);

function setup(){
  createCanvas(windowWidth, windowHeight-40);
  system = new LSystem('F', 'FF[+F][-F+F]F');
  systemViewer = new LSystemViewer();

  visualScale = 1;

  stroke(255);
}  

function draw(){
  background(50);

  push();
  translate(width/2, height * 0.8);
  scale(visualScale);
  systemViewer.draw(system);
  pop();
}

function keyPressed(){
  if (keyCode === RIGHT_ARROW) {
    system.step();
  } else if (key === '-'){
    visualScale = Math.max(0.1, visualScale - 0.2);
  } else if (key === '='){
    visualScale += 0.2;
  }
}

function mouseWheel(event){
  let zoomDelta = 0.1 * Math.sign(event.delta + 0.001) 
                      * Math.log( abs(event.delta) )
                      / log10;
  visualScale = Math.max(0.1, visualScale + zoomDelta);
}
