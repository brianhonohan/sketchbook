class Puck {
  Circle circle;
  PVector prevPos;
  PVector vel;
  PVector acc;
  color colorVal;
  HockeyRinkViewer viewer;

  Puck(){
    circle = new Circle(0, 0, 2.5);
    prevPos = new PVector();
    vel = new PVector();
    acc = new PVector();
    colorVal = color(50);
  }

  float x() { return this.circle.pos.x; }
  float y() { return this.circle.pos.y; }
  
  void setRinkViewer(HockeyRinkViewer view){
    this.viewer = view;
  }
  
  void applyForce(PVector force){
    acc.add(force);
  }

  void moveTo(float x, float y){
    this.circle.pos.x = x;
    this.circle.pos.y = y;
  }

  boolean containsXY(float x, float y){
    return this.circle.containsXY(x, y);
  }  

  boolean isOutOfBounds(){
    return this.circle.pos.x < 0 
        || this.circle.pos.x > width
        || this.circle.pos.y < 0
        || this.circle.pos.y > height;
  }

  void update(){
    this.moveTo(this.x() + this.vel.x, this.y() + this.vel.y);
    vel.add(acc);
    acc.setMag(0);
  }
  
  void draw(){
    if (this.circle.containsXY(viewer.mousePos.x, viewer.mousePos.y)){
      // println("mouse over puck: " + frameCount);
      fill(100, 230, 100);
    }else{
      fill(colorVal);
    }
    noStroke();
    this.circle.draw();
  }
}
