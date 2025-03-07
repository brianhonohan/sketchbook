class Circle {
  constructor(x, y, radius){
    this.pos = new Vector2D(x, y);
    this.radius = radius;
  }

  get x() { return this.pos.x; }
  get y() { return this.pos.y; }
  get minX() { return this.pos.x - this.radius; }
  get maxX() { return this.pos.x + this.radius; }
  get minY() { return this.pos.y - this.radius; }
  get maxY() { return this.pos.y + this.radius; }
  get centerX() { return this.pos.x; }
  get centerY() { return this.pos.y; }
  get width() { return this.radius * 2; }
  get height() { return this.radius * 2; }

  moveTo(x, y){
    this.pos.x = x;
    this.pos.y = y;
  }

  setSize(newSize){
    this.radius = newSize / 2;
  }

  pointsAtX(x) {
    if (x < this.minX || x > this.maxX) {
      return [];
    }

    // dx^2 + dy^2 = r^2
    // dy = (r^2 - dx^2) ^ 0.5
    const dx = this.x - x;
    const rSquared = Math.pow(this.radius, 2);
    const dy = Math.pow(rSquared - dx*dx, 0.5);

    return [{x: x, y: this.y + dy}, {x: x, y: this.y - dy}];
  }

  pointsAtY(y) {
    if (y < this.minY || y > this.maxY) {
      return [];
    }

    // dx^2 + dy^2 = r^2
    // dx = (r^2 - dy^2) ^ 0.5
    const dy = this.y - y;
    const rSquared = Math.pow(this.radius, 2);
    const dx = Math.pow(rSquared - dy*dy, 0.5);

    return [{x: this.x + dx, y: y}, {x: this.x - dx, y: y}];
  }

  containsXY(x, y){
    return  dist(x, y, this.x, this.y) < this.radius;
  }
}
