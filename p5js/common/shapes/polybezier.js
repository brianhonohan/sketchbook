class Polybezier {
  constructor(){
    this.curves = [];
    this.closed = false;
  }

  static circle(x, y, radius){
    // From: https://spencermortensen.com/articles/bezier-circle/
    // P0=(0,1), P1=(c,1), P2=(1,c), P3=(1,0)
    // c=0.551915024494
    const unitC = 0.551915024494;
    const scaledC = unitC * radius;
    let c = scaledC;
    let l = radius;

    const approxCircle = new Polybezier();
    approxCircle.append(new BezierCurve( 0,  l,  c,  l,  l,  c,  l,  0));
    approxCircle.append(new BezierCurve( l,  0,  l, -c,  c, -l,  0, -l));
    approxCircle.append(new BezierCurve( 0, -l, -c, -l, -l, -c, -l,  0));
    approxCircle.append(new BezierCurve(-l,  0, -l,  c, -c,  l,  0,  l));
    approxCircle.close();
    approxCircle.dragEnabled = true;
    approxCircle.move(x, y);
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

  move(x, y){
    this.curves.forEach(c => c.move(x, y));
  }

  rotateAbout(a, b, c){
    this.curves.forEach(curve => curve.rotateAbout(a, b, c));
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
    this.curves.forEach(c => c.draw());
  }
}