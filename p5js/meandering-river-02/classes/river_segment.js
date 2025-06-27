class RiverSegment {
  constructor(end, parent, id){
    this.end = end;
    this.parent = parent; 
    this.id = id;
  }

  get start() { return this.parent.end; }

  endAsArray() {
    return [this.end.x, this.end.y];
  }
  
  updateEndFromArray(arr){
    this.end.x = arr[0];
    this.end.y = arr[1];
  }

  vectorFromParent(){
    return createVector(this.end.x - this.start.x, this.end.y - this.start.y);
  }

  halve(){
    this.end.x = this.start.x + (this.end.x - this.start.x) / 2;
    this.end.y = this.start.y + (this.end.y - this.start.y) / 2;
  }

  draw(){
    // stroke(224, 65, 90);
    line(this.start.x, this.start.y, this.end.x, this.end.y);
  }
}