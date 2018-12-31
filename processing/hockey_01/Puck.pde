class Puck {
  PVector pos;
  PVector vel;
  PVector acc;
  color colorVal;
  
  Puck(){
    pos = new PVector();
    vel = new PVector();
    acc = new PVector();
    colorVal = color(50);
  }
  
  void applyForce(PVector force){
    acc.add(force);
  }
  
  void moveTo(int x, int y){
    this.pos.x = x;
    this.pos.y = y;
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
    fill(colorVal);
    noStroke();
    ellipse(pos.x, pos.y, 5, 5);
  }
}
