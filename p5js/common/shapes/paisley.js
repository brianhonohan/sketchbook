class Paisley {
  constructor(x, y, heading, bulbRadius, tailX, tailY) {
    this.pos = new Point(x, y);
    this.bulbRadius = bulbRadius;
    this.radiusPt = new Point(0,0);

    this.leftShoulderPt = new Point(x, y);
    this.rightShoulderPt = new Point(x, y);
    this.leftConstraint = createVector(0, 0);
    this.rightConstraint = createVector(0, 0);
    this.spineConstraint = createVector(0, 0);
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
    this.accentViaScaledPaisley = true;

    this.drawSpine = false;
  }

  static defaultPaisley(){
    return new Paisley(0.3 * width, 0.5 * height, 
                        HALF_PI + QUARTER_PI, 0.08 * width,
                        0.6 * width, 0.4 * height );
  }

  updatePoints(arg_list_or_x, y, heading, bulbRadius, tailX, tailY){
    if (arg_list_or_x.constructor === Array){
      this.pos.x = arg_list_or_x[0];
      this.pos.y = arg_list_or_x[1];
      this.bulbRadius = arg_list_or_x[3];
      this.tail.x = arg_list_or_x[4];
      this.tail.y = arg_list_or_x[5];
      
      this.heading = arg_list_or_x[2]; // this will trigger _calcHelperPoints()
    } else {
      this.pos.x = arg_list_or_x;
      this.pos.y = y;
      this.bulbRadius = bulbRadius;
      this.tail.x = tailX;
      this.tail.y = tailY;
      
      this.heading = heading; // this will trigger _calcHelperPoints()
    }
    this._initPolyBezier();
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

  createOuterPaisley(scale){
    this.outerPaisley = this.getScaledClone(scale);
    this.outerPaisley.parent = this;
    this.outerPaisley.scale = scale;
    return this.outerPaisley;
  }
  clearPaisley(){
    this.outerPaisley = undefined;
  }

  getScaledClone(scale){
    const scaledClone = Paisley.defaultPaisley();
    let scaledPoints = this.getScaledClonePoints(scale);
    scaledClone.updatePoints(scaledPoints);
    return scaledClone;
  }

  getScaledClonePoints(scale){
    const newRadius = this.bulbRadius * scale;
    const newTail = this.spine.pointAt(scale);
    if (scale > 1){
      // WARNING: Napkin math ... actually didn't even use a napkin
      const tangentNearTail = this.spine.tangentAt(0.999);
      const spineApproxLength = this.spine.approximateLength(10);
      const approxTailGrowth = spineApproxLength * (scale - 1);

      tangentNearTail.setLength(approxTailGrowth);
      newTail.x = this.tail.x + tangentNearTail.dx();
      newTail.y = this.tail.y + tangentNearTail.dy();
    }

    return [this.x, this.y, this.heading, newRadius, newTail.x, newTail.y];
  }


  _updateHeadingPt(){
    this.headingPt.x = this.x + this.headingVec.x * this.bulbRadius;
    this.headingPt.y = this.y + this.headingVec.y * this.bulbRadius;
  }

  _updateRadiusPt(){
    this.radiusPt.x = this.leftShoulderPt.x;
    this.radiusPt.y = this.leftShoulderPt.y;
  }

  get leftBulbCurve() { return this.polybezier.curves[0]; }
  get rightBulbCurve() { return this.polybezier.curves[1]; }
  get rightTailCurve() { return this.polybezier.curves[2]; }
  get leftTailCurve() { return this.polybezier.curves[3]; }

  _initPolyBezier() {
    if (this.polybezier == undefined){
      this.polybezier = new Polybezier();
      this.polybezier.append(BezierCurve.defaultCurve());
      this.polybezier.append(BezierCurve.defaultCurve());
      this.polybezier.append(BezierCurve.defaultCurve());
      this.polybezier.append(BezierCurve.defaultCurve());

      this.spine = BezierCurve.defaultCurve();
    }

    this.spine.updatePoints(this.pos, this.spineConstraint, this.tail, this.tail);

    this.leftBulbCurve.makeCircleQuarterArc(this.x, this.y, this.bulbRadius, this.heading - HALF_PI);
    this.rightBulbCurve.makeCircleQuarterArc(this.x, this.y, this.bulbRadius, this.heading);

    this.rightTailCurve.updatePoints(this.rightShoulderPt,
                                    this.rightConstraint,
                                    this.tail,
                                    this.tail);

    this.leftTailCurve.updatePoints(this.tail, this.tail,
                                    this.leftConstraint,
                                    this.leftShoulderPt
                                    );
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
     
    this.spineConstraint.set(this.x - step.x * 2, this.y - step.y * 2);

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

    if (this.outerPaisley){
      this.outerPaisley.cascadeDrag();
    }
  }
  handleMouseReleased(){
    this.isDragged = false;
    if (this.pressedElement) {
      this.pressedElement.handleMouseReleased();
      this.pressedElement = undefined;
    }
  }

  cascadeDrag(){
    this.updatePoints( this.parent.getScaledClonePoints(this.scale) )

    if (this.outerPaisley){
      this.outerPaisley.cascadeDrag()
    }
  }

  draw(){
    if (this.outerPaisley){
      this.outerPaisley.draw();
    }

    P5JsUtils.applyStyleSet(this);
    this.polybezier.draw();

    if (this.drawSpine){
      this.spine.draw();
    }
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

    if (this.accentViaScaledPaisley){
      let scale = 1 + this.exteriorAccent.margin / this.bulbRadius;
      let paisleyClone = this.getScaledClone(scale);
      
      for (let i = 0; i < paisleyClone.polybezier.curves.length; i++){
        curve = paisleyClone.polybezier.curves[i];
        let stepSize = (i < 2) ? this.exteriorAccent.step * 2 : this.exteriorAccent.step;

        for (let j = 0; j < 1; j += stepSize){
          accentLocation = curve.pointAt(j);
          
          this.exteriorAccent.moveTo(accentLocation.x, accentLocation.y);
          this.exteriorAccent.draw();
        }
      }
      return;
    }

    for (let i = 0; i < this.polybezier.curves.length; i++){
      curve = this.polybezier.curves[i];
      let stepSize = (i < 2) ? this.exteriorAccent.step * 2 : this.exteriorAccent.step;

      for (let j = 0; j < 1; j += stepSize){
        accentLocation = curve.perpendicularAt(j, this.exteriorAccent.margin * -1).rotate180().start;
        
        this.exteriorAccent.moveTo(accentLocation.x, accentLocation.y);
        this.exteriorAccent.draw();
      }
    }
  }
}