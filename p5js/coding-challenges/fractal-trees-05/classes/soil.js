class Soil {
  constructor(sizeAndPos, params){
    this.area = sizeAndPos;
    this.params = params;

    this.nutrients = [];
    for (var i = 0; i< this.params.num_nutrients; i++){
      let pos = createVector(random(this.area.width), random(this.area.height));
      this.nutrients.push(new Nutrient(pos));
    }

    this.plants = [];
    if (this.params.mode == 'cross-section'){
      this.placePlantsAtGroundLevel();
    } else if (this.params.mode == 'top-down-random'){
      this.placePlantsRandomly();
    }
  }

  placePlantsAtGroundLevel(){
    let spacing = this.area.width / (1 + this.params.num_plants);
    for (var i = 0; i< this.params.num_plants; i++){
      let xPos = floor(spacing * (i + 1));
      let newPlant = new Plant(xPos, 0, this.params);
      this.plant(newPlant);
    }
  }

  placePlantsRandomly(){
    for (var i = 0; i< this.params.num_plants; i++){
      let xPos = random(this.area.width);
      let yPos = random(this.area.height);
      let newPlant = new Plant(xPos, yPos, this.params);
      this.plant(newPlant);
    }
  }

  plant(newPlant){
    this.plants.push(newPlant);
  }

  tick(){
    this.transmitNutrients();
    this.plants.forEach(p => p.tick());
  }

  transmitNutrients(){
    if (this.nutrients.length == 0){
      return;
    }

    let nearbyNutrients = this.nutrients.filter(n => {
      return this.plants.some(p => p.detectionArea.containsXY(n.x, n.y));
    });

    let allSegments = this.plants.map(p => p.segments).flat();

    let nutrientsWithSeg = nearbyNutrients.map(n => {
      return {
        nutrient: n,
        segments: allSegments.filter(seg => seg.detectionArea.containsXY(n.x, n.y))
      };
    });
    nutrientsWithSeg = nutrientsWithSeg.filter(nSeg => nSeg.segments.length > 0);

    nutrientsWithSeg.forEach(nSeg => {
      let closest = Number.POSITIVE_INFINITY; // intentially very large number
      let idxOfClosest = null;
      for(var i = 0; i < nSeg.segments.length; i++){
        let segment = nSeg.segments[i];
        let dist = p5.Vector.dist(nSeg.nutrient.pos, segment.pos);
        if (dist < segment.nutrientDectionRange && dist < closest){
          idxOfClosest = i;
          closest = dist;
        }
      }

      if (idxOfClosest == null){
        return;
      }

      let closestSeg = nSeg.segments[idxOfClosest];
      closestSeg.addTargetNutrient(nSeg.nutrient);

      if (closest < 10){
        this.depleteNutrient(nSeg.nutrient);
      }
    });
  }

  depleteNutrient(nutrient){
    for (var i = 0; i < this.nutrients.length; i++){
      if (this.nutrients[i] != nutrient){
        continue;
      }

      this.nutrients.splice(i, 1);
      break;
    }
  }

  draw(){
    push();
    translate(this.area.x, this.area.y);

    Nutrient.setStyles();
    this.nutrients.forEach(n => n.draw());

    this.plants.forEach(p => p.draw());
    pop();
  }
}