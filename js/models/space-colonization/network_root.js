class NetworkRoot {
  constructor(x, y, params){
    this.x = x;
    this.y = y;
    this.params = params;

    this.segments = [];
    this.detectionArea = new Rect(this.x, this.y, 0, 0);

    // Only used if: params.random_colors_per_network == true
    this.color = color(random(50, 220), random(50, 220), random(50, 220));
    this.fillColor = color(red(this.color), green(this.color), blue(this.color), 80);

    let firstSegment = new RootSegment(this.x, this.y + 10, this, this);
    this.addRootSegment(firstSegment);
  }

  addRootSegment(segment){
    this.segments.push(segment);
    this.detectionArea.expandToIncludeRect(segment.detectionArea);
  }

  tick(){
    this.segments.forEach(s => s.tick());
  }

  draw(){
    if (this.params.draw_network_areas){
      noStroke();
      if (this.params.random_colors_per_network){
        fill(this.fillColor);
      }else{
        fill(200,200,50,80);
      }
      P5JsUtils.drawRect(this.detectionArea);
    }

    this.segments.forEach(s => s.draw());
  }
}
