class Circle implements Shape {
  PVector pos;
  float radius;

  Circle(float x, float y, float radius){
    this.pos = new PVector(x, y);
    this.radius = radius;
  }

  float x() { return this.pos.x; }
  float y() { return this.pos.y; }
  void move(float x, float y) { 
    this.pos.x += x;
    this.pos.y += y; 
  }
  float minX(){ return this.pos.x - this.radius; }
  float minY(){ return this.pos.y - this.radius; }
  float maxX(){ return this.pos.x + this.radius; }
  float maxY(){ return this.pos.y + this.radius; }

  boolean containsXY(float x, float y){
    return  dist(x, y, this.pos.x, this.pos.y) < this.radius;
  }

  void draw(){
    ellipseMode(CENTER);
    ellipse(this.pos.x, this.pos.y, this.radius * 2, this.radius * 2);
  }
}
