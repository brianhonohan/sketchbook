class Plant {
  constructor(x, y){
    this.x = x;
    this.y = y;

    this.segments = [];
    this.tips = [];

    let firstSegment = new RootSegment(this.x, this.y + 10, this);
    this.segments.push(firstSegment);

    let downward = createVector(0, 1);
    let firstTip = new RootTip(this.x, this.y + 20, firstSegment, downward);

    this.tips.push(firstTip);
  }

  tick(){
    this.tips.forEach(t => t.tick());
  }

  draw(){
    RootSegment.setStyle();
    this.segments.forEach(s => s.draw());
    
    RootTip.setStyle();
    this.tips.forEach(t => t.draw());
  }
}
