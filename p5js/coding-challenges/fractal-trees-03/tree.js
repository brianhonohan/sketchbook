class Tree {
  constructor(x, y){
    this.x = x;
    this.y = y;

    this.segments = [];
    this.segments.push(new ApicalMeristem(-PI/2));
    this.segments.push(new ApicalMeristem(PI/2));
  }

  tick(){
    this.segments.forEach(s => s.tick());
  }

  draw(){
    push();
    translate(this.x, this.y);
    this.segments.forEach(s => s.draw());
    pop();
  }
}
