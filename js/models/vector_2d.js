class Vector2D {
  constructor(x, y) {
    this.x = x;
    this.y = y;
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