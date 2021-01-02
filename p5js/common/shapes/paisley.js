class Paisley {
  constructor(x, y, heading, bulbRadius) {
    this.pos = new Point(x, y);
    this.bulbRadius = bulbRadius;

    this.leftShoulderPt = new Point(x, y);
    this.rightShoulderPt = new Point(x, y);
    this.shoulderConstraintOffset = createVector(0,0);

    this.headingVec = createVector(1, 0);
    this.headingPt = new Point(1, 0);
    this.heading = heading;

    this.tail = new Point(x, y);

    this.draggable = false;
    this._initDefaultTail();
    this._calcHelperPoints();

    this._initPolyBezier();
    this.points = [];
    this.points.push(this.pos);
    this.points.push(this.tail);
    this.points.push(this.headingPt);
  }

  get x() { return this.pos.x; }
  get y() { return this.pos.y; }
  get heading() { return this._heading; }
  set heading(newVal){
    this.headingVec.x = 1;
    this.headingVec.y = 0;
    this.headingVec.rotate(newVal);
    this._updateHeadingPt();
    this._calcHelperPoints();
    this._heading = newVal;
  }

  _updateHeadingPt(){
    this.headingPt.x = this.x + this.headingVec.x * this.bulbRadius;
    this.headingPt.y = this.y + this.headingVec.y * this.bulbRadius;
  }

  _initPolyBezier() {
    this.polybezier = new Polybezier();
    this.polybezier.append(BezierCurve.circularQuarterArc(this.x, this.y, this.bulbRadius, this.heading - HALF_PI));
    this.polybezier.append(BezierCurve.circularQuarterArc(this.x, this.y, this.bulbRadius, this.heading));


    this.rightConstraint = p5.Vector.add(this.rightShoulderPt.pos, this.shoulderConstraintOffset);
    this.leftConstraint = p5.Vector.add(this.leftShoulderPt.pos, this.shoulderConstraintOffset);

    let rightTail = new BezierCurve(this.rightShoulderPt,
                                    p5.Vector.add(this.rightShoulderPt.pos, this.shoulderConstraintOffset),
                                    this.tail,
                                    this.tail);
    this.polybezier.append(rightTail);

    let leftTail = new BezierCurve(this.tail, this.tail,
                                    this.leftConstraint,
                                    this.leftShoulderPt
                                    );

    this.polybezier.append(leftTail);
  }

  _initDefaultTail(){
    this.tail.x = this.x;
    this.tail.y = this.y;

    let step = this.headingVec.copy();
    step.mult(this.bulbRadius);

    step.rotate(HALF_PI);
    step.rotate(HALF_PI);

    step.mult(3);
    this.tail.add(step);

    step.rotate(HALF_PI);
    step.mult(1);
    this.tail.add(step);
  }

  _calcHelperPoints(){
    let step = this.headingVec.copy();
    step.mult(this.bulbRadius);

    step.rotate(HALF_PI);
    this.rightShoulderPt.set(this.x + step.x, this.y + step.y);
    this.leftShoulderPt.set(this.x - step.x, this.y - step.y);

    step.rotate(HALF_PI);
    this.shoulderConstraintOffset.x = step.x * 2;
    this.shoulderConstraintOffset.y = step.y * 2;
  }

  get dragEnabled() { return this._dragEnabled; }
  set dragEnabled(newVal){
    this.points.forEach(pt => pt.dragEnabled = newVal);
    this._dragEnabled = newVal;
  }

  toggleDragEnabled(){
    this.dragEnabled = !this.dragEnabled;
  }

  handleMousePressed(){
    this.pressedElement = this.points.find(el => el.handleMousePressed());
    if (this.pressedElement){
      this.isDragged = true;
      return true;
    }
    return false;
  }
  handleMouseDragged(){
    this.pressedElement.handleMouseDragged();

    if (this.pressedElement == this.pos){
      this._updateHeadingPt();
      this._calcHelperPoints();
    } else if (this.pressedElement == this.tail) {
      // no extra work here (for now)
    } else if (this.pressedElement == this.headingPt){
      let newHeadingVec = createVector(this.headingPt.x - this.x,this.headingPt.y - this.y);
      this.heading = newHeadingVec.heading();
      this._calcHelperPoints();
    }
    this._initPolyBezier();
  }
  handleMouseReleased(){
    this.isDragged = false;
    if (this.pressedElement) {
      this.pressedElement.handleMouseReleased();
      this.pressedElement = undefined;
    }
  }

  drawDraggablePoints(){
    this.points.forEach(p => p.draw(p));
  }

  draw(){
    this.polybezier.draw();

    if (this.dragEnabled) {
      this.drawDraggablePoints();
    }
  }
}