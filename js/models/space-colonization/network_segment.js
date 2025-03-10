class NetworkSegment {
  constructor(x, y, parent, network){
    this.pos = new Vector2D(x, y);
    this.parent = parent;
    this.network = network;
    this.detectionRange = this.network.params.detection_range;
    this.detectionArea = new Rect(this.x - this.detectionRange / 2, 
                                  this.y - this.detectionRange / 2,
                                  this.detectionRange,
                                  this.detectionRange);
    this.influencers = [];
    this.fillColor = color(red(this.network.fillColor),
                           green(this.network.fillColor),
                           blue(this.network.fillColor),
                           20);
  }

  get x(){ return this.pos.x; }
  get y(){ return this.pos.y; }

  addInfluencer(influencer){
    this.influencers.push(influencer);
  }

  tick(){
    if (this.influencers.length == 0){
      return;
    }

    let totalPos = new Vector2D(0, 0);
    let randomModifier = function(vector, delta) { vector.mult(UtilFunctions.random(1-delta, 1+delta)); return vector; }
    let vectorAdder = function(total, vector) { total.add(vector); return total; };
    this.influencers
        .map(influencer => randomModifier(influencer.pos.copy(), 0.008))
        .reduce(vectorAdder, totalPos);

    let avgPos = Vector2D.div(totalPos, this.influencers.length);

    if (abs(avgPos.x - this.x) > 1 || abs(avgPos.y - this.y) > 1){
      this.addSegment(avgPos);
    }
  }

  addSegment(atPos){
    let networkSeg = new NetworkSegment(atPos.x, atPos.y, this, this.network);
    this.network.addSegment(networkSeg);
  }

  static setStyle(){
    stroke(230);
  }

  draw(){
    if (this.network.isActive && this.network.params.draw_segment_areas){
      noStroke();
      if (this.network.params.color_per_network){
        fill(this.fillColor);
      }else{
        fill(50,200,50,20);
      }
      P5JsUtils.drawRect(this.detectionArea);
    }

    if (this.network.isActive && this.network.params.color_per_network){
      stroke(this.network.color);
    }else{
      stroke(230);
    }
    line(this.parent.x, this.parent.y, this.x, this.y);

    stroke(50, 220, 240);
    this.influencers.forEach(n => {
      line(this.x, this.y, n.x, n.y);
    });
    this.influencers = []; // clear it out for next tick/draw cycle.
  }
}
