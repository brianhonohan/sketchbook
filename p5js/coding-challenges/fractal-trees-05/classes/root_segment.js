class RootSegment {
  constructor(x, y, parent){
    this.pos = createVector(x, y);
    this.parent = parent;
    this.nutrientDectionRange = 50;
    this.detectionArea = new Rect(this.x - this.nutrientDectionRange / 2, 
                                  this.y - this.nutrientDectionRange / 2,
                                  this.nutrientDectionRange,
                                  this.nutrientDectionRange);
    this.targetNutrients = [];
  }

  get x(){ return this.pos.x; }
  get y(){ return this.pos.y; }

  addTargetNutrient(nutrient){
    this.targetNutrients.push(nutrient);
  }

  static setStyle(){
    stroke(230);
  }

  draw(){
    // fill(50,200,50,80);
    // P5JsUtils.drawRect(this.detectionArea);
    stroke(230);
    line(this.parent.x, this.parent.y, this.x, this.y);

    stroke(50, 220, 240);
    this.targetNutrients.forEach(n => {
      line(this.x, this.y, n.x, n.y);
    });
    this.targetNutrients = []; // clear it out for next tick/draw cycle.
  }
}