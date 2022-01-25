// Implementation of: 
// https://en.wikipedia.org/wiki/Distance_from_a_point_to_a_line
// 
// Given: 
//  Line:    ax + by + c = 0
//  Point:   (x, y)
//
// Supported Line:
//    y = mx + c 
//    0 = mx + c - y
// 
// Therefore:
// a = m (slope)
// b = -1
// c = c
//
// Compute distance from the point to the line
// d = |a*x + b *y +c| / ( (a*a + b*b) ^ 1/2 )
// 


class PointToLine {
  constructor(point, line){
    this.point = point;
    this.line = line;
  }

  get a() { return this.line.slope; }
  get b() { return -1 }
  get c() { return this.line.offset; }
  get x() { return this.point.x; }
  get y() { return this.point.y; }

  distance(){
    return this._distance_numerator() / this._distance_denominator();
  }

  _distance_numerator(){
    return Math.abs(this.a * this.x - 1 * this.y + this.c);
  }

  _distance_denominator(){
    return Math.pow( (this._a_squared__plus__b_squared()), 0.5);
  }

  _a_squared__plus__b_squared(){
    return this.a * this.a + 1;
  }

  closestX(){
    let numerator = ( this.b * (this.b * this.x - this.a * this.y) - this.a * this.c);
    let denominator = (this._a_squared__plus__b_squared());
    return numerator / denominator; 
  }

  closestY(){
    let numerator = ( this.a * (- this.b * this.x + this.a * this.y) - this.b * this.c);
    let denominator = (this._a_squared__plus__b_squared());
    return numerator / denominator; 
  }
}