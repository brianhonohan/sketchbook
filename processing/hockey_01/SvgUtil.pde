// Requires: import processing.svg.*;
// See: https://processing.org/reference/libraries/svg/index.html

class SvgUtil {
  boolean capturing = false;
  
  void captureNextDraw(){
    capturing = true;
  }
  
  void handleDrawStart(){
    if (capturing) {
      beginRecord(SVG, "frame-####.svg");
    }
  }
  
  void handleDrawFinish(){
    if (capturing) {
      endRecord();
      capturing = false;
    }
  }
}
