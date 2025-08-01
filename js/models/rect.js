class Rect {
  constructor(x, y, p_nWidth, p_nHeight){
    this._x = x;
    this._y = y;
    this._width = p_nWidth;
    this._height = p_nHeight;
  }

  get x(){ return this._x; }
  get y(){ return this._y; }
  set x(newVal){ this._x = newVal; }
  set y(newVal){ this._y = newVal; }

  get width(){ return this._width; }
  get height(){ return this._height; }
  set width(newVal){ this._width = newVal; }
  set height(newVal){ this._height = newVal; }

  get minX(){ return this._x; }
  get minY(){ return this._y; }
  get maxX(){ return this._x + this._width; }
  get maxY(){ return this._y + this._height; }
  get centerX(){ return this._x + this._width / 2; }
  get centerY(){ return this._y + this._height / 2; }

  move(x, y){
    this._x += x;
    this._y += y;
  }

  moveTo(x, y){
    this._x = x;
    this._y = y;
  }

  copy(){
    return new Rect(this._x, this._y, this._width, this._height);
  }

  localRect(){
    return new Rect(0, 0, this.width, this.height);
  }

  contains(otherRect){
    return this.minX < otherRect.minX && this.maxX > otherRect.maxX
            && this.minY < otherRect.minY && this.maxY > otherRect.maxY;
  }

  overlaps(otherRect){
    if ((this._x + this._width) < otherRect._x) { return false; }
    if ((this._y + this._height) < otherRect._y) { return false; }
    if ((otherRect._x + otherRect._width) < this._x) { return false; }
    if ((otherRect._y + otherRect._height) < this._y) { return false; }
    return true;
  }

  expandToIncludeRect(otherRect){
    let maxX = this.maxX;
    let maxY = this.maxY;

    this._x = Math.min(this._x, otherRect._x);
    this._y = Math.min(this._y, otherRect._y);

    maxX = Math.max(maxX, otherRect.maxX);
    maxY = Math.max(maxY, otherRect.maxY);

    this._width  = maxX - this._x;
    this._height = maxY - this._y;
  }

  static rectContainsXY(rect1, x, y){
    return rect1.x <= x && x < (rect1.x + rect1.width)
           && rect1.y <= y && y < (rect1.y + rect1.height);
  }

  // These merely need to be rect-ducks, responding to .x .y and .width and .height
  static rectContainsObject(rect1, otherRect){
    if ((rect1.x + rect1.width) < otherRect.x) { return false; }
    if ((rect1.y + rect1.height) < otherRect.y) { return false; }
    if ((otherRect.x + otherRect.width) < rect1.x) { return false; }
    if ((otherRect.y + otherRect.height) < rect1.y) { return false; }
    return true;
  }

  containsXY(x, y){ 
    return this.minX <= x && x < this.maxX 
           && this.minY <= y && y < this.maxY;
  }

  getConcentric(scale){
    let newX = this.x - (scale - 1) * this.width / 2;
    let newY = this.y - (scale - 1) * this.height / 2;
    return new Rect(newX, newY, this.width * scale, this.height * scale);
  }

  static pointsContainXY(p1x, p1y, p2x, p2y, x, y){
    // applies an epsilon check for vertical or horizontal lines as search rectangles
    return ( (Math.min(p1x, p2x) <= x && x <= Math.max(p1x, p2x) ) 
              || (Math.abs(p1x - p2x) < 0.000001 && Math.abs(p1x - x) < 0.000001))
          && ( (Math.min(p1y, p2y) <= y && y <= Math.max(p1y, p2y))
              || (Math.abs(p1y - p2y) < 0.000001 && Math.abs(p1y - y) < 0.000001));
  }
}