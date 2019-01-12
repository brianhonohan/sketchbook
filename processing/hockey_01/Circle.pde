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


  PVector[] pointsAtX(float x) {
    if (x < this.minX() || x > this.maxX()) {
      return new PVector[0];
    }

    // dx^2 + dy^2 = r^2
    // dy = (r^2 - dx^2) ^ 0.5
    float dx = this.x() - x;
    float rSquared = pow(this.radius, 2);
    float dy = pow(rSquared - dx*dx, 0.5);

    PVector[] results = new PVector[2];
    results[0] = new PVector(x, this.y() + dy);
    results[1] = new PVector(x, this.y() - dy);
    return results;
  }

  PVector[] pointsAtY(float y) {
    if (y < this.minY() || y > this.maxY()) {
      return new PVector[0];
    }

    // dx^2 + dy^2 = r^2
    // dx = (r^2 - dy^2) ^ 0.5
    float dy = this.y() - y;
    float rSquared = pow(this.radius, 2);
    float dx = pow(rSquared - dy*dy, 0.5);

    PVector[] results = new PVector[2];
    results[0] = new PVector(this.x() + dx, y);
    results[1] = new PVector(this.x() - dx, y);
    return results;
  }


  boolean containsXY(float x, float y){
    return  dist(x, y, this.pos.x, this.pos.y) < this.radius;
  }

  boolean contains(Circle other){
    float distToOther = dist(other.x(), other.y(), this.x(), this.y());
    return (distToOther + other.radius) < this.radius;
  }

  void draw(){
    ellipseMode(CENTER);
    ellipse(this.pos.x, this.pos.y, this.radius * 2, this.radius * 2);
  }
}
