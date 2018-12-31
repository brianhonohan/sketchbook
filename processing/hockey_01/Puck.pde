class Puck {
  PVector pos;
  PVector vel;
  PVector acc;
  color colorVal;
  float radius;
  
  Puck(){
    pos = new PVector();
    vel = new PVector();
    acc = new PVector();
    colorVal = color(50);
    radius = 2.5;
  }
  
  void applyForce(PVector force){
    acc.add(force);
  }
  
  void moveTo(int x, int y){
    this.pos.x = x;
    this.pos.y = y;
  }
  
  boolean containsXY(int x, int y){
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
    if (puck.containsXY(mouseX, mouseY)){
      // println("mouse over puck: " + frameCount);
      fill(100, 230, 100);
    }else{
      fill(colorVal);
    }
    noStroke();
    ellipse(pos.x, pos.y, this.radius * 2, this.radius * 2);
  }
}
