HockeyRink rink;
HockeyRinkViewer rinkViewer;
int scaleFactor = 3;
int margin = 25;
import processing.svg.*;
boolean record;
SvgUtil svgUtil;

void setup() {
  size(640, 320);
  rink = new HockeyRink();
  rinkViewer = new HockeyRinkViewer();
  rinkViewer._x = margin;
  rinkViewer._y = margin;
  rinkViewer._scale = scaleFactor;
  
  svgUtil = new SvgUtil();
}

void draw(){
  background(180);
  svgUtil.handleDrawStart();
  rinkViewer.drawRink(rink);
  debugFrameRate();
  
  svgUtil.handleDrawFinish();
}

void debugFrameRate(){
  text(frameRate, 10, 10);
}

void mousePressed() {
  svgUtil.captureNextDraw();
}
