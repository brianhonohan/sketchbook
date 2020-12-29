class Polybezier {
  constructor(){
    this.curves = [];
    this.closed = false;
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