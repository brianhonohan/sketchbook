HockeyRink rink;
HockeyRinkViewer rinkViewer;
int scaleFactor = 3;
int margin = 25;
import processing.svg.*;
boolean record;

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
  if (record) {
    beginRecord(SVG, "frame-####.svg");
  }

  rinkViewer.drawRink(rink);
  
  if (record) {
    endRecord();
    record = false;
  }
}

void mousePressed() {
  record = true;
}
