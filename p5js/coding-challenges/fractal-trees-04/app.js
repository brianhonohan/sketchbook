var system;
var systemViewer;
var visualScale;
var log10 = Math.log(10);

var params = {
  axiom: 'F',
  rule: 'FF[+F][-F+F]F'
}

function setup(){
  createCanvas(windowWidth, windowHeight-40);
  visualScale = 1;

  gui = new dat.gui.GUI();
  guiAxiom = gui.add(params, "axiom");
  gui.add(params, "rule");
  addGuiListeners();

  system = new LSystem(params);
  systemViewer = new LSystemViewer();
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

function addGuiListeners(){
  guiAxiom.onFinishChange(function(value) {
    system = new LSystem(params);
  });
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
