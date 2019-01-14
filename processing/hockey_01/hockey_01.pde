HockeyRink rink;
HockeyRinkViewer rinkViewer;
int scaleFactor = 3;
int margin = 25;
Puck puck;
PuckViewer puckViewer;
MouseStick stick;

// For testing Board collisions
LineSegment lineSeg;
PVector testingPuckStart;
Puck testingPuck;
PuckViewer testingPuckViewer;

void setup() {
  size(640, 320);
  rink = new HockeyRink();
  rinkViewer = new HockeyRinkViewer();
  rinkViewer._x = margin;
  rinkViewer._y = margin;
  rinkViewer._scale = scaleFactor;
  
  stick = new MouseStick();
  stick.setRinkViewer(rinkViewer);
  
  puck = new Puck();
  puck.setRink(rink);
  puck.moveTo(rink.centerFaceoffSpot());
  puckViewer = new PuckViewer(puck);
  puckViewer.setRinkViewer(rinkViewer);
  
  lineSeg = new LineSegment(50, 150, 100, 150);
  testingPuckStart = new PVector();
  testingPuck = new Puck();
  testingPuck.setRink(rink);
}

void draw(){
  background(180);
  rinkViewer.update();
  puck.update();

  pushMatrix();
  translate(rinkViewer._x, rinkViewer._y);
  rinkViewer.drawRink(rink);
  puckViewer.draw();
  popMatrix();

  displayMockTrajectory();
  debugFrameRate();
}

void debugFrameRate(){
  fill(0);
  text(frameRate, 10, 10);
}

void displayMockTrajectory(){
  stroke(50, 200, 50);
  strokeWeight(4);
  lineSeg.draw();
  
  testingPuckStart.x = transformXToRinkX(lineSeg.startX);
  testingPuckStart.y = transformYToRinkY(lineSeg.startY);
  
  float puckX = transformXToRinkX(lineSeg.endX);
  float puckY = transformYToRinkY(lineSeg.endY);
  testingPuck.circle.pos.x = puckX;
  testingPuck.circle.pos.y = puckY;
  
  int violation = rink.constraintViolated(testingPuckStart, testingPuck.circle);
  text("Violation: " + violation, 100, 10);
  
  PVector dummyVel = lineSeg.getVector();
  dummyVel.setMag(20);
  rink.constrainMovement(testingPuckStart, testingPuck.circle, dummyVel);
  
  float scaledX = transformRinkXToX(testingPuck.x());
  float scaledY = transformRinkYToY(testingPuck.y());
  
  if (scaledX != lineSeg.endX || scaledY != lineSeg.endY){
    noStroke();
    fill(255, 150, 100);
    ellipse(lineSeg.endX, lineSeg.endY, 10, 10);
  }
  
  noStroke();
  fill(30);
  ellipse(scaledX, scaledY, 10, 10);
  
  stroke(255, 150, 100);
  line(scaledX, scaledY, scaledX + dummyVel.x, scaledY + dummyVel.y);
}

float transformXToRinkX(float x){
  return (x - rinkViewer._x) / rinkViewer._scale;
}

float transformYToRinkY(float y){
  return (y - rinkViewer._y) / rinkViewer._scale;
}

float transformRinkXToX(float x){
  return rinkViewer._x + x * rinkViewer._scale;
}

float transformRinkYToY(float y){
  return rinkViewer._y + y * rinkViewer._scale;
}

void mousePressed(){
  lineSeg.handleMousePressed();
  if (puckViewer.containsXY(rinkViewer.mousePos.x, rinkViewer.mousePos.y)){
    stick.startWindUp();
  }
}

void mouseReleased(){
  lineSeg.handleMouseReleased();
  if (stick.isWindingUp()){
    stick.releaseWindUp();
  }
}

void mouseDragged(){
  lineSeg.handleMouseDragged();
}

void keyPressed(){
  if (key == 'p'){
     saveFrame("screenshot-######.png");
  } else if (key == 's') {
    puck.vel.mult(0);
  }
}
