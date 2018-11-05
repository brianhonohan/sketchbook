class Tree {
  constructor(x, y){
    this.x = x;
    this.y = y;

    this.segments = [];
    this.segments.push(new ApicalMeristem(true, this.x, this.y, this));
    this.segments.push(new ApicalMeristem(false, this.x, this.y, this));
  }

  tick(){
    this.segments.forEach(s => s.tick());
  }

  draw(){
    this.segments.forEach(s => s.draw());
  }
}
