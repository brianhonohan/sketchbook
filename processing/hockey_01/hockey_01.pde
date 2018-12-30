HockeyRink rink;
int scaleFactor = 3;
int margin = 25;
import processing.svg.*;
boolean record;
PShape rinkSvg;
SvgUtil svgUtil;

void setup() {
  size(640, 320);
  rink = new HockeyRink();
  svgUtil = new SvgUtil();
  rinkSvg = loadShape("hockey_rink.svg");
}

void draw(){
  background(180);
  svgUtil.handleDrawStart();
  debugFrameRate();
  shape(rinkSvg, 0, 0);
  
  svgUtil.handleDrawFinish();
}

void debugFrameRate(){
  text(frameRate, 10, 10);
}

void mousePressed() {
  svgUtil.captureNextDraw();
}
