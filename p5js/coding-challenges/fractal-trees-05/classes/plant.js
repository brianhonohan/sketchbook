class Plant {
  constructor(x, y){
    this.x = x;
    this.y = y;

    this.segments = [];
    this.tips = [];
    this.detectionArea = new Rect(this.x, this.y, 0, 0);

    let firstSegment = new RootSegment(this.x, this.y + 10, this);
    this.addRootSegment(firstSegment);

    let downward = createVector(0, 1);
    let firstTip = new RootTip(this.x, this.y + 20, firstSegment, downward, this);

    this.tips.push(firstTip);
  }

  addRootSegment(segment){
    this.segments.push(segment);
    this.detectionArea.expandToIncludeRect(segment.detectionArea);
  }

  tick(){
    this.tips.forEach(t => t.tick());
  }

  draw(){
    fill(50,200,50,80);
    P5JsUtils.drawRect(this.detectionArea);

    RootSegment.setStyle();
    this.segments.forEach(s => s.draw());
    
    RootTip.setStyle();
    this.tips.forEach(t => t.draw());
  }
}
