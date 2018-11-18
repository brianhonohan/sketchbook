class Soil {
  constructor(sizeAndPos){
    this.area = sizeAndPos;

    this.nutrients = [];
    this.numNutrients = 200;
    for (var i = 0; i< this.numNutrients; i++){
      let pos = createVector(random(this.area.width), random(this.area.height));
      this.nutrients.push(new Nutrient(pos));
    }
  }


  draw(){
    push();
    translate(this.area.x, this.area.y);

    Nutrient.setStyles();
    this.nutrients.forEach(n => n.draw());

    pop();
  }
}