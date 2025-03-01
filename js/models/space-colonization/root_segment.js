class RootSegment {
  constructor(x, y, parent, plant){
    this.pos = createVector(x, y);
    this.parent = parent;
    this.plant = plant;
    this.nutrientDectionRange = this.plant.params.detection_range;
    this.detectionArea = new Rect(this.x - this.nutrientDectionRange / 2, 
                                  this.y - this.nutrientDectionRange / 2,
                                  this.nutrientDectionRange,
                                  this.nutrientDectionRange);
    this.targetNutrients = [];
    this.fillColor = color(red(this.plant.fillColor),
                           green(this.plant.fillColor),
                           blue(this.plant.fillColor),
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

    let totalPos = createVector(0, 0);
    let randomModifier = function(vector, delta) { vector.mult(random(1-delta, 1+delta)); return vector; }
    let vectorAdder = function(total, vector) { total.add(vector); return total; };
    this.targetNutrients
        .map(nutrient => randomModifier(nutrient.pos.copy(), 0.008))
        .reduce(vectorAdder, totalPos);

    let avgPos = p5.Vector.div(totalPos, this.targetNutrients.length);

    if (abs(avgPos.x - this.x) > 1 || abs(avgPos.y - this.y) > 1){
      this.addBranch(avgPos);
    }
  }

  addBranch(atPos){
    let rootSeg = new RootSegment(atPos.x, atPos.y, this, this.plant);
    this.plant.addRootSegment(rootSeg);
  }

  static setStyle(){
    stroke(230);
  }

  draw(){
    if (this.plant.params.draw_segment_areas){
      noStroke();
      if (this.plant.params.random_colors_per_plant){
        fill(this.fillColor);
      }else{
        fill(50,200,50,20);
      }
      P5JsUtils.drawRect(this.detectionArea);
    }

    if (this.plant.params.random_colors_per_plant){
      stroke(this.plant.color);
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
