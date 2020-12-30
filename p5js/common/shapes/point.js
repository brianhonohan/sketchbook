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

  // NOTE: This function accepts alternate formatted params
  // (Point, heading)
  // (x, y, heading)
  rotateAbout(a, b, c){
    let otherPoint;
    let heading;

    if (a instanceof Point){
      otherPoint = a.pos;
      heading = b;
    } else {
      otherPoint = createVector(a, b);
      heading = c;
    }

    let diff = p5.Vector.sub(this.pos, otherPoint);
    diff.rotate(heading);
    this.x = otherPoint.x + diff.x;
    this.y = otherPoint.y + diff.y;
  }

  containsXY(x, y){
    return dist(x, y, this.x, this.y) < this.radius;
  }
}