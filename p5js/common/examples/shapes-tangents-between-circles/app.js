var canvas;
var circle1;
var circle2;
let tangentMode;
let shapes = [];

var gui;
var params = {
  tangentModeIdx: 1
}

function setup(){
  canvas = createCanvas(windowWidth, windowHeight - 35);

  circle1 = new Circle(0.25 * width, height/2, 0.1 * width);
  circle2 = new Circle(0.66 * width, height/2, 0.2 * width);
  shapes = [circle1, circle2];
  circle2.dragEnabled = true;
  circle1.debugMode = true; 

  gui = P5JsSettings.addDatGui({autoPlace: false});
  guiTangentMode = gui.add(params, "tangentModeIdx", 0,3,1);
  gui.add(circle1, "debugMode");
  addGuiListeners();
}

function addGuiListeners(){
  guiTangentMode.onChange(function(value) {
    setTangentMode(params.tangentModeIdx);
  });
}

function draw(){
  background(50);

  // circle1.pos.x = mouseX;
  // circle1.pos.y = mouseY;

  noFill();
  stroke(230);
  strokeWeight(2);
  circle1.draw();
  circle2.draw();

  const lineSeg = circle1.tangentToCircle(circle2, tangentMode);
  stroke(230);
  lineSeg.draw();
}

function keyTyped(){
  switch (key) {
    case '1':
      setTangentMode(0);
      break;
    case '2':
      setTangentMode(1);
      break;
    case '3':
      setTangentMode(2);
      break;
    case '4':
      setTangentMode(3);
      break;
    case 'd':
      circle1.debugMode = !circle1.debugMode;
      break;
    case 'p':
      saveCanvas(canvas, 'screenshot', 'png');
      break;
  }
}

function mousePressed(){
  shapes.filter(s => s.dragEnabled)
        .find(s => s.handleMousePressed());
}

function mouseDragged(){
  shapes.filter(s => s.isDragged)
        .forEach(s => s.handleMouseDragged());
}

function mouseReleased(){
  shapes.filter(s => s.isDragged)
        .forEach(s => s.handleMouseReleased());
}

function setTangentMode(newIdx){
  params.tangentModeIdx = newIdx;
  tangentMode = getTangentMode(newIdx);
  gui.updateDisplay();
}

function getTangentMode(idx){
  return [
    Circle.TANGENT_MODE_POS_TO_POS,
    Circle.TANGENT_MODE_POS_TO_NEG,
    Circle.TANGENT_MODE_NEG_TO_POS,
    Circle.TANGENT_MODE_NEG_TO_NEG
  ][idx];
}
