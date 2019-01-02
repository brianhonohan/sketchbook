class Circle {
  PVector pos;
  float radius;

  Circle(float x, float y, float radius){
    this.pos = new PVector(x, y);
    this.radius = radius;
  }

  float x() { return this.pos.x; }
  float y() { return this.pos.y; }

  boolean containsXY(float x, float y){
    return  dist(x, y, this.pos.x, this.pos.y) < this.radius;
  }

  void draw(){
    ellipseMode(CENTER);
    ellipse(this.pos.x, this.pos.y, this.radius * 2, this.radius * 2);
  }
}
