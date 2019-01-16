class MouseStick {
  int state;
  HockeyRinkViewer viewer;

  public static final int STATE_NORMAL = 0;
  public static final int STATE_WINDING_UP = 1;
  
  MouseStick(){
     state = MouseStick.STATE_NORMAL;
  }

  void setRinkViewer(HockeyRinkViewer view){
    this.viewer = view;
  }
  
  boolean isWindingUp(){
    return this.state == MouseStick.STATE_WINDING_UP;
  }
  
  void startWindUp(){
    this.state = MouseStick.STATE_WINDING_UP;
  }

  void releaseWindUp(){
    if (!this.isWindingUp()){
      return;
    }
    PVector mouseInRink = viewer.mousePosInRink();
    PVector impulseVector = new PVector(puck.x() - mouseInRink.x, puck.y() - mouseInRink.y);
    float impulseFactor = 0.02;
    float impulseMag = impulseVector.mag() * impulseFactor;
    impulseVector.setMag(impulseMag);
    puck.applyForce(impulseVector);
    this.state = MouseStick.STATE_NORMAL;
  }
  
  void draw(){
    if (this.state == MouseStick.STATE_NORMAL){
      return;
    }
    
    strokeWeight(3);
    stroke(100, 200, 100);
    PVector mouseInRink = viewer.mousePosInRink();
    line(mouseInRink.x, mouseInRink.y, puck.x(), puck.y());
  }
}
