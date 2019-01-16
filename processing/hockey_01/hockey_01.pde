HockeyRink rink;
HockeyRinkViewer rinkViewer;
int scaleFactor = 3;
int margin = 25;

void setup() {
  size(640, 320);
  rink = new HockeyRink();
  rinkViewer = new HockeyRinkViewer();
  rinkViewer._x = margin;
  rinkViewer._y = margin;
  rinkViewer._scale = scaleFactor;
}

void draw(){
  background(180);
  rinkViewer.drawRink(rink);
  debugFrameRate();
}

void debugFrameRate(){
  text(frameRate, 10, 10);
}
