class Plant {
  constructor(x, y, params){
    this.x = x;
    this.y = y;
    this.params = params;

    this.segments = [];
    this.tips = [];
    this.detectionArea = new Rect(this.x, this.y, 0, 0);

    let firstSegment = new RootSegment(this.x, this.y + 10, this, this);
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
    this.segments.forEach(s => s.tick());
    this.tips.forEach(t => t.tick());
  }

  draw(){
    if (this.params.draw_plant_areas){
      noStroke();
      fill(200,200,50,80);
      P5JsUtils.drawRect(this.detectionArea);
    }

    RootSegment.setStyle();
    this.segments.forEach(s => s.draw());
    
    RootTip.setStyle();
    this.tips.forEach(t => t.draw());
  }
}
