class Polybezier {
  constructor(){
    this._reset();
  }

  clear(){
    this._reset()
  }

  _reset(){
    this.curves = [];
    this.closed = false;
  }

  static circle(x, y, radius){
    const approxCircle = new Polybezier();
    approxCircle.append(BezierCurve.circularQuarterArc(x, y, radius, 0));
    approxCircle.append(BezierCurve.circularQuarterArc(x, y, radius, HALF_PI));
    approxCircle.append(BezierCurve.circularQuarterArc(x, y, radius, PI));
    approxCircle.append(BezierCurve.circularQuarterArc(x, y, radius, 3 * HALF_PI));
    approxCircle.close();
    approxCircle.dragEnabled = true;
    return approxCircle;
  }

  get head() { return this.curves[0]; }
  get tail() { return this.curves[this.curves.length - 1]; }
  get length() { return this.curves.length; }

  get dragEnabled() { return this._dragEnabled; }
  set dragEnabled(newVal){
    this.curves.forEach(c => c.dragEnabled = newVal);
    this._dragEnabled = newVal;
  }

  toggleDragEnabled(){
    this.dragEnabled = !this.dragEnabled;
  }

  move(x, y){
    this.curves.forEach(c => c.move(x, y));
  }

  rotateAbout(a, b, c){
    this.curves.forEach(curve => curve.rotateAbout(a, b, c));
  }

  smooth(mode){
    let stopIdx = this.closed ? this.length - 1: this.length - 2;
    for(let i = 0; i <= stopIdx; i++){
      let nextIdx = (i + 1) % this.curves.length;
      this.smoothVertex(this.curves[i],
                        this.curves[nextIdx],
                        mode);
    }
  }

  static get SMOOTH_MODE_CASCADE() { return 0; }
  static get SMOOTH_MODE_TRAILING() { return 1; }
  static get SMOOTH_MODE_AVERAGE() { return 2; }

  smoothVertex(curve1, curve2, mode){
    let p1;
    let p2 = curve1.p4;
    let p3;
    switch(mode){
      case Polybezier.SMOOTH_MODE_CASCADE:
        p1 = curve1.p3;
        p3 = curve2.p2;
        Point.align(p1, p2, p3);
        break;
      case Polybezier.SMOOTH_MODE_TRAILING:
        p1 = curve2.p2;
        p3 = curve1.p3;
        Point.align(p1, p2, p3);
        break;
    }

  }

  handleMousePressed(){
    const pressedElement = this.curves.find(s => s.handleMousePressed());
    if (pressedElement){
      this.isDragged = true;
      return true;
    }
    return false;
  }
  handleMouseDragged(){
    this.curves.forEach(s => s.handleMouseDragged());
  }
  handleMouseReleased(){
    this.curves.forEach(s => s.handleMouseReleased());
    this.isDragged = false;
  }

  append(curve){
    if (this.closed){
      console.warn("Unable to append to a closed Polybezier.");
      return;
    }
    if (this.tail){
      curve.attachHeadTo(this.tail);
    }
    this.curves.push(curve);
  }

  close(){
    if (this.length < 2){
      console.warn("Unable to close a Polybezier whose length is less than 2.");
      return;
    }
    this.tail.attachTailTo(this.head);
    this.closed = true;
  }

  isClosed(){
    return this.closed;
  }

  draw(){
    P5JsUtils.applyStyleSet(this);
    this.curves.forEach(c => c.draw());
  }

  // Unused
  _drawEachEachCurve(){
    beginShape();
    vertex(this.curves[0].p1.x, this.curves[0].p1.y);
    this.curves.forEach(bc => {
      bezierVertex(bc.p2.x, bc.p2.y, bc.p3.x, bc.p3.y, bc.p4.x, bc.p4.y);
    });
    endShape();
  }
}