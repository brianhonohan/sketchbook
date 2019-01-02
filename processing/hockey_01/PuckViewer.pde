class PuckViewer {
  Puck puck;
  HockeyRinkViewer viewer;
  color colorVal;
  
  PuckViewer(Puck _puck){
    puck = _puck;
    colorVal = color(50);
  }

  void setRinkViewer(HockeyRinkViewer view) {
    viewer = view;
  }

  boolean containsXY(float x, float y) {
    return puck.containsXY(x / viewer._scale, y / viewer._scale);
  }  
  
  void draw() {
    if (this.containsXY(viewer.mousePos.x, viewer.mousePos.y)) {
      // println("mouse over puck: " + frameCount);
      fill(100, 230, 100);
    } else {
      fill(colorVal);
    }

    pushMatrix();
    scale(rinkViewer._scale);
    noStroke();
    this.puck.circle.draw();
    popMatrix();
  }
}
