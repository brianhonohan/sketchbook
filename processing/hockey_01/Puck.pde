class Puck {
  PVector pos;
  PVector vel;
  PVector acc;
  color colorVal;
  float radius;
  HockeyRinkViewer viewer;

  Puck(){
    pos = new PVector();
    vel = new PVector();
    acc = new PVector();
    colorVal = color(50);
    radius = 2.5;
  }
  
  void setRinkViewer(HockeyRinkViewer view){
    this.viewer = view;
  }
  
  void applyForce(PVector force){
    acc.add(force);
  }
  
  void moveTo(int x, int y){
    this.pos.x = x;
    this.pos.y = y;
  }
  
  boolean containsXY(float x, float y){
    return dist(this.pos.x, this.pos.y, x, y) < this.radius;
  }
  
  boolean isOutOfBounds(){
    return this.pos.x < 0 
        || this.pos.x > width
        || this.pos.y < 0
        || this.pos.y > height;
  }

  void update(){
    pos.add(vel);
    vel.add(acc);
    acc.setMag(0);
  }
  
  void draw(){
    if (this.containsXY(viewer.mousePos.x, viewer.mousePos.y)){
      // println("mouse over puck: " + frameCount);
      fill(100, 230, 100);
    }else{
      fill(colorVal);
    }
    noStroke();
    ellipse(pos.x, pos.y, this.radius * 2, this.radius * 2);
  }
}
