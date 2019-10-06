class Rectangle extends Rect {
  constructor(x, y, p_nWidth, p_nHeight){
    super(x, y, p_nWidth, p_nHeight);
    this.initPoints();
    this.computePoints();
    this.dragEnabled = false;
    this.dragArea = this;
    this.dragOffset = undefined;
    this.isDragged = false;
    this.fillColor = color(80);
  }

  setSize(newSize){
    let deltaWidth    = this.width - newSize;
    let deltaHeight   = this.height - newSize;

    // Maintain location
    this._x += deltaWidth / 2;
    this._y += deltaHeight / 2;

    this._width   = newSize;
    this._height  = newSize;
  }

  initPoints(){
    this.topLeft      = new Point(0, 0);
    this.topRight     = new Point(0, 0);
    this.bottomRight  = new Point(0, 0);
    this.bottomLeft   = new Point(0, 0);

    this.points = [];
    this.points.push(this.topLeft);
    this.points.push(this.topRight);
    this.points.push(this.bottomRight);
    this.points.push(this.bottomLeft);
  }

  computePoints(){
    this.topLeft.set(this.minX, this.minY);
    this.topRight.set(this.maxX, this.minY);
    this.bottomRight.set(this.maxX, this.maxY);
    this.bottomLeft.set(this.minX, this.maxY);
  }

  computePosAndSize(){
    const allX = this.points.map(p => p.x);
    const allY = this.points.map(p => p.y);

    const minX = Math.min(...allX);
    const minY = Math.min(...allY);
    const maxX = Math.max(...allX);
    const maxY = Math.max(...allY);

    this._x = minX;
    this._y = minY;
    this._width = maxX - minX;
    this._height = maxY - minY;
  }

  handleMousePressed(){
    const pointPressed = this.points.find(p => p.containsXY(mouseX, mouseY));

    if (pointPressed){
      pointPressed.isBeingDragged = true;
      this.isDragged = true;
      return true;
    } else {
      const dragAreaPressed = this.dragArea.containsXY(mouseX, mouseY);
      if (dragAreaPressed){
        this.isDragged = true;
        this.dragOffset = new Point(mouseX - this.x, mouseY - this.y);
        return true;
      }
    }
    return false;
  }

  handleMouseDragged(){
    const pointDragged = this.points.find(p => p.isBeingDragged);

    if (pointDragged) {
      pointDragged.set(mouseX, mouseY);

      if (this.topLeft == pointDragged) {
        this.bottomLeft.x = pointDragged.x;
        this.topRight.y = pointDragged.y;

      } else if (this.topRight == pointDragged) {
        this.bottomRight.x = pointDragged.x;
        this.topLeft.y = pointDragged.y;

      } else if (this.bottomRight == pointDragged) {
        this.topRight.x = pointDragged.x;
        this.bottomLeft.y = pointDragged.y;

      } else if (this.bottomLeft == pointDragged) {
        this.topLeft.x = pointDragged.x;
        this.bottomRight.y = pointDragged.y;
      }
      this.computePosAndSize();
    } else {
      this._x = mouseX - this.dragOffset.x;
      this._y = mouseY - this.dragOffset.y;
      this.computePoints();
    }
  }

  handleMouseReleased(){
    this.points.forEach(p => { p.isBeingDragged = false; });
    this.isDragged = false;
  }

  draw(){
    fill(this.fillColor);
    rect(this.x, this.y, this.width, this.height);

    if (this.dragEnabled) {
      this.drawDraggablePoints();
    }
  }

  drawDraggablePoints(){
    this.points.forEach(p => this.drawPoint(p));
  }

  drawPoint(point){
    if (point.containsXY(mouseX, mouseY)){
      fill(200, 200, 100);
    }else {
      fill(100, 200, 100);
    }
    noStroke();
    ellipse(point.x, point.y, point.radius, point.radius);
  }
}