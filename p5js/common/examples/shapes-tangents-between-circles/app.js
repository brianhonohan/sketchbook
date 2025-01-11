var canvas;
var circle1;
var circle2;
var tangentMode;

function setup(){
  canvas = createCanvas(500, 500);

  circle1 = new Circle(100, height/2,  75);
  circle2 = new Circle(325, height/2, 125);
  setTangentMode();
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

  circle1.debugMode = true;

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
    case 'p':
      saveCanvas(canvas, 'screenshot', 'png');
      break;
  }
}

function setTangentMode(newIdx){
  tangentMode = getTangentMode(newIdx);
}

function getTangentMode(idx){
  return [
    Circle.TANGENT_MODE_POS_TO_POS,
    Circle.TANGENT_MODE_POS_TO_NEG,
    Circle.TANGENT_MODE_NEG_TO_POS,
    Circle.TANGENT_MODE_NEG_TO_NEG
  ][idx];
}
