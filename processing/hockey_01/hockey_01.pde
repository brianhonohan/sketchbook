HockeyRink rink;
HockeyRinkViewer rinkViewer;
int scaleFactor = 3;
int margin = 25;
Puck puck;

void setup() {
  size(640, 320);
  rink = new HockeyRink();
  rinkViewer = new HockeyRinkViewer();
  rinkViewer._x = margin;
  rinkViewer._y = margin;
  rinkViewer._scale = scaleFactor;
  rinkViewer.drawRink(rink);
  
  puck = new Puck();
  puck.moveTo(width/2, height/2);
}

void draw(){
  background(180);
  rinkViewer.drawRink(rink);
  debugFrameRate();
  
  puck.update();
  puck.draw();
}

void debugFrameRate(){
  text(frameRate, 10, 10);
}
