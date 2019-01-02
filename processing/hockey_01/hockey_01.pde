HockeyRink rink;
HockeyRinkViewer rinkViewer;
int scaleFactor = 3;
int margin = 25;
Puck puck;
PuckViewer puckViewer;
MouseStick stick;

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
  
  debugFrameRate();
}

void debugFrameRate(){
  text(frameRate, 10, 10);
}

void mousePressed(){
  if (puckViewer.containsXY(rinkViewer.mousePos.x, rinkViewer.mousePos.y)){
    stick.startWindUp();
  }
}

void mouseReleased(){
  if (stick.isWindingUp()){
    stick.releaseWindUp();
  }
}
void keyPressed(){
  if (key == 'p'){
     saveFrame("screenshot-######.png");
  }
}
