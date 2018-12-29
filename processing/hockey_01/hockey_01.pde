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
  rinkViewer.drawRink(rink);
  noLoop();
  smooth();
}
