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
