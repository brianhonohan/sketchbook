class Puck {
  Circle circle;
  PVector prevPos;
  PVector vel;
  PVector acc;
  HockeyRink rink;

  Puck(){
    circle = new Circle(0, 0, 1); // Effectively 2' wide puck
    prevPos = new PVector();
    vel = new PVector();
    acc = new PVector();
  }

  float x() { return this.circle.pos.x; }
  float y() { return this.circle.pos.y; }

  void setRink(HockeyRink rink) {
    this.rink = rink;
  }

  void applyForce(PVector force){
    acc.add(force);
  }

  void moveTo(PVector newPos){
    this.moveTo(newPos.x, newPos.y);
  }

  void moveTo(float x, float y) {
    prevPos.x = this.x();
    prevPos.y = this.y();
    this.circle.pos.x = x;
    this.circle.pos.y = y;
    rink.constrainMovement(prevPos, this.circle, this.vel);
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
}
