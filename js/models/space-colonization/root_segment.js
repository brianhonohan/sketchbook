class RootSegment {
  constructor(x, y, parent, network){
    this.pos = new Vector2D(x, y);
    this.parent = parent;
    this.network = network;
    this.nutrientDectionRange = this.network.params.detection_range;
    this.detectionArea = new Rect(this.x - this.nutrientDectionRange / 2, 
                                  this.y - this.nutrientDectionRange / 2,
                                  this.nutrientDectionRange,
                                  this.nutrientDectionRange);
    this.targetNutrients = [];
    this.fillColor = color(red(this.network.fillColor),
                           green(this.network.fillColor),
                           blue(this.network.fillColor),
                           20);
  }

  get x(){ return this.pos.x; }
  get y(){ return this.pos.y; }

  addTargetNutrient(nutrient){
    this.targetNutrients.push(nutrient);
  }

  tick(){
    if (this.targetNutrients.length == 0){
      return;
    }

    let totalPos = new Vector2D(0, 0);
    let randomModifier = function(vector, delta) { vector.mult(UtilFunctions.random(1-delta, 1+delta)); return vector; }
    let vectorAdder = function(total, vector) { total.add(vector); return total; };
    this.targetNutrients
        .map(nutrient => randomModifier(nutrient.pos.copy(), 0.008))
        .reduce(vectorAdder, totalPos);

    let avgPos = Vector2D.div(totalPos, this.targetNutrients.length);

    if (abs(avgPos.x - this.x) > 1 || abs(avgPos.y - this.y) > 1){
      this.addBranch(avgPos);
    }
  }

  addBranch(atPos){
    let rootSeg = new RootSegment(atPos.x, atPos.y, this, this.network);
    this.network.addRootSegment(rootSeg);
  }

  static setStyle(){
    stroke(230);
  }

  draw(){
    if (this.network.params.draw_segment_areas){
      noStroke();
      if (this.network.params.random_colors_per_network){
        fill(this.fillColor);
      }else{
        fill(50,200,50,20);
      }
      P5JsUtils.drawRect(this.detectionArea);
    }

    if (this.network.params.random_colors_per_network){
      stroke(this.network.color);
    }else{
      stroke(230);
    }
    line(this.parent.x, this.parent.y, this.x, this.y);

    stroke(50, 220, 240);
    this.targetNutrients.forEach(n => {
      line(this.x, this.y, n.x, n.y);
    });
    this.targetNutrients = []; // clear it out for next tick/draw cycle.
  }
}
