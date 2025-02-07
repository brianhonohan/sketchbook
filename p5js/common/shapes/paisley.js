class Paisley {
  constructor(x, y, heading, bulbRadius, tailX, tailY) {
    this.pos = new Point(x, y);
    this.bulbRadius = bulbRadius;
    this.radiusPt = new Point(0,0);

    this.leftShoulderPt = new Point(x, y);
    this.rightShoulderPt = new Point(x, y);
    this.leftConstraint = createVector(0, 0);
    this.rightConstraint = createVector(0, 0);
    this.tail = new Point(x, y);

    this.headingVec = createVector(1, 0);
    this.headingPt = new Point(1, 0);
    this.heading = heading;

    this.draggable = false;
    if (tailX == undefined || tailY == undefined) {
      this._initDefaultTail();
    } else {
      this.tail.x = tailX;
      this.tail.y = tailY;
    }
    this._calcHelperPoints();

    this._initPolyBezier();
    this.points = [];
    this.points.push(this.pos);
    this.points.push(this.tail);
    this.points.push(this.headingPt);
    this.points.push(this.radiusPt);

    // Exterior Accent
    // want a 'shape' that can be drawn
    // want spacing between them
    // want spacing from edge
    // want toggling to display or not
    // want it to handle styling based on percent around paisley side
    // will want the same for 'interior' accent
    // FOR NOW: Assume sensible defaults; and then iterate
    // this paisley will likely handle rotation translation
    this.exteriorAccent = undefined;
  }

  _constructorCall(){
    return `new Paisley(${this.x}, ${this.y}, `
            + `${this.heading}, ${this.bulbRadius},`
            + `${this.tail.x}, ${this.tail.y});`;
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

  _updateRadiusPt(){
    this.radiusPt.x = this.leftShoulderPt.x;
    this.radiusPt.y = this.leftShoulderPt.y;
  }

  _initPolyBezier() {
    if (this.polybezier == undefined){
      this.polybezier = new Polybezier();
    }

    // TODO: Investigate moving existing curves rather than recreate them
    this.polybezier.clear();
    this.polybezier.append(BezierCurve.circularQuarterArc(this.x, this.y, this.bulbRadius, this.heading - HALF_PI));
    this.polybezier.append(BezierCurve.circularQuarterArc(this.x, this.y, this.bulbRadius, this.heading));

    let rightTail = new BezierCurve(this.rightShoulderPt,
                                    this.rightConstraint,
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

    this._calcShoulderConstraints();
  }

  _calcShoulderConstraints(){
    let step = this.headingVec.copy();
    step.rotate(PI);

    // let mags = [this.bulbRadius * 2, this.bulbRadius * 2]; 
    let mags = this._shoulderConstraintMag();
    let rightMag = mags[0];
    let leftMag  = mags[1];

    this.rightConstraint.set(step);
    this.rightConstraint.mult(rightMag);
    this.rightConstraint.add(this.rightShoulderPt.pos);

    this.leftConstraint.set(step);
    this.leftConstraint.mult(leftMag);
    this.leftConstraint.add(this.leftShoulderPt.pos);
    this._updateRadiusPt();
  }

  // This method tries to dynamically adjust the constraint points for the
  // left and right shoulders, based on the heading in relation to the current tail vector
  // It falls short when angle between the heading and tail vector < 90 degrees.
  _shoulderConstraintMag(){
    this.tailVec = createVector(this.tail.x - this.x, this.tail.y - this.y);
    this.tailMag = this.tailVec.mag();

    // NOTE: angleBetween(v1, v2) falls short, because it doesn't give direction
    let rotationBtw = P5JsUtils.rotationBetweenVectors(this.headingVec, this.tailVec);
    let absRotation = abs(rotationBtw);

    let outerMag = min(this.bulbRadius, this.tailMag) * 2; 
    let innerMag = min(this.bulbRadius, this.tailMag) * 2;

    if (absRotation < 2) {
      outerMag *= (1 + 2 - absRotation);
      innerMag *= (1 - 2 + absRotation);
    }

    if (rotationBtw > 0) {
      return [innerMag, outerMag];
    } else {
      return [outerMag, innerMag];
    }
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
    } else if (this.pressedElement == this.tail) {
      this._shoulderConstraintMag();
    } else if (this.pressedElement == this.headingPt){
      let newHeadingVec = createVector(this.headingPt.x - this.x,this.headingPt.y - this.y);
      this.heading = newHeadingVec.heading();
    } else if (this.pressedElement == this.radiusPt){
      this.bulbRadius = this.pos.distTo(this.radiusPt);
      this._updateHeadingPt();
    }
    this._calcHelperPoints();
    this._initPolyBezier();
  }
  handleMouseReleased(){
    this.isDragged = false;
    if (this.pressedElement) {
      this.pressedElement.handleMouseReleased();
      this.pressedElement = undefined;
    }
  }

  draw(){
    P5JsUtils.applyStyleSet(this);
    this.polybezier.draw();
    this.drawExteriorAccent();

    if (this.dragEnabled) {
      P5JsUtils.drawControlPoints(this.points);
    }
  }

  drawExteriorAccent(){
    if (this.exteriorAccent == undefined){
      return;
    }
    let curve;
    let accentLocation;

    for (let i = 0; i < this.polybezier.curves.length; i++){
      curve = this.polybezier.curves[i];

      for (let j = 0; j < 1; j += this.exteriorAccent.step){
        accentLocation = curve.perpendicularAt(j, this.exteriorAccent.margin * -1).rotate180().start;
        
        this.exteriorAccent.moveTo(accentLocation.x, accentLocation.y);
        this.exteriorAccent.draw();
      }
    }
  }
}