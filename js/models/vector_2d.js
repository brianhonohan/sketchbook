class Vector2D {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  get r() { return this.mag(); }
  set r(newVal) {
    let theta = this.theta;
    this.x = newVal * Math.cos(theta);
    this.y = newVal * Math.sin(theta);
  }
  get theta() { return Math.atan2(this.y, this.x); }
  set theta(newVal) {
    let mag = this.mag();
    this.x = mag * Math.cos(newVal);
    this.y = mag * Math.sin(newVal);
  }

  copy() {
    return new Vector2D(this.x, this.y);
  }

  mult(factor) {
    this.x *= factor;
    this.y *= factor;
    return this;
  }

  div(factor) {
    this.x /= factor;
    this.y /= factor;
    return this;
  }

  add(otherVec) {
    this.x += otherVec.x;
    this.y += otherVec.y;
    return this;
  }

  sub(otherVec) {
    this.x -= otherVec.x;
    this.y -= otherVec.y;
    return this;
  }

  magSquared(){
    return this.x * this.x + this.y * this.y;
  }

  mag(){
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  distSquared(otherVec){
    return (this.x - otherVec.x) * (this.x - otherVec.x) +
           (this.y - otherVec.y) * (this.y - otherVec.y);
  }

  dist(otherVec){
    return Math.sqrt((this.x - otherVec.x) * (this.x - otherVec.x) +
                     (this.y - otherVec.y) * (this.y - otherVec.y));
  }

  static mult(v, factor) {
    return new Vector2D(v.x * factor, v.y * factor);
  }
  static div(v, factor) {
    return new Vector2D(v.x / factor, v.y / factor);
  }
  static add(v1, v2) {
    return new Vector2D(v1.x + v2.x, v1.y + v2.y);
  }
  static sub(v1, v2) {
    return new Vector2D(v1.x - v2.x, v1.y - v2.y);
  }
  static dist(v1, v2) {
    return v1.dist(v2);
  }
  static mag(v) {
    return v.mag();
  }
}