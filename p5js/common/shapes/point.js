class Point {
  constructor(x, y){
    this.pos = createVector(x, y);
    this.radius = 10;
    this.isBeingDragged = false;
  }

  get x(){ return this.pos.x; }
  get y(){ return this.pos.y; }
  set x(newVal){ this.pos.x = newVal; }
  set y(newVal){ this.pos.y = newVal; }

  set(x, y){
    this.x = x;
    this.y = y;
  }

  move(x, y){
    this.x += x;
    this.y += y;
  }

  containsXY(x, y){
    return dist(x, y, this.x, this.y) < this.radius;
  }
}