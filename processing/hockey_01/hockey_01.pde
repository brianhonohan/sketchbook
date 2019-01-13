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
  text(frameRate, 10, 10);
}

void displayMockTrajectory(){
  stroke(50, 200, 50);
  strokeWeight(4);
  lineSeg.draw();
  noStroke();
  fill(30);
  
  testingPuckStart.x = transformXToRinkX(lineSeg.startX);
  testingPuckStart.y = transformYToRinkY(lineSeg.startY);
  
  float puckX = transformXToRinkX(lineSeg.endX);
  float puckY = transformYToRinkY(lineSeg.endY);
  testingPuck.circle.pos.x = puckX;
  testingPuck.circle.pos.y = puckY;
  ellipse(lineSeg.endX, lineSeg.endY, 10, 10);
  
  int violation = rink.constraintViolated(testingPuckStart, testingPuck.circle);
  text("Violation: " + violation, 100, 10);
  
  PVector dummyVec = new PVector();
  rink.constrainMovement(testingPuckStart, testingPuck.circle, dummyVec);
}

float transformXToRinkX(float x){
  return (x - rinkViewer._x) / rinkViewer._scale;
}

float transformYToRinkY(float y){
  return (y - rinkViewer._y) / rinkViewer._scale;
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
  }
}
