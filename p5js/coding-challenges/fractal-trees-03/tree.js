class Tree {
  constructor(x, y){
    this.x = x;
    this.y = y;

    this.segments = [];
    this.segments.push(new TreeSegment(-PI/2));
    this.segments.push(new TreeSegment(PI/2));

    this.apicalMeristems = [];
    this.apicalMeristems.push( new ApicalMeristem(this.segments[0]) );
    this.apicalMeristems.push( new ApicalMeristem(this.segments[1]) );
  }

  tick(){
    this.apicalMeristems.forEach(s => s.tick());
    this.segments.forEach(s => s.tick());
  }

  draw(){
    push();
    translate(this.x, this.y);
    this.segments.forEach(s => s.draw());
    pop();
  }
}
