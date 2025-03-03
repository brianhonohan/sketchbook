

class Space {
  constructor(sizeAndPos, params){
    this.area = sizeAndPos;
    this.params = params;

    this.nutrients = [];
    for (var i = 0; i< this.params.num_nutrients; i++){
      let pos = new Vector2D(UtilFunctions.random(this.area.width), UtilFunctions.random(this.area.height));
      this.nutrients.push(new Nutrient(pos));
    }

    this.networks = [];
    if (this.params.mode == 'cross-section'){
      this.placeNetworksAtGroundLevel();
    } else if (this.params.mode == 'top-down-random'){
      this.placeNetworksRandomly();
    } else if (this.params.mode == 'top-down-orderly-rows'){
      this.placeNetworksInRows();
    }
  }

  placeNetworksAtGroundLevel(){
    let spacing = this.area.width / (1 + this.params.num_networks);
    for (var i = 0; i< this.params.num_networks; i++){
      let xPos = Math.floor(spacing * (i + 1));
      let newNetwork = new NetworkRoot(xPos, 0, this.params);
      this.addNetwork(newNetwork);
    }
  }

  placeNetworksRandomly(){
    for (var i = 0; i< this.params.num_networks; i++){
      let xPos = UtilFunctions.random(this.area.width);
      let yPos = UtilFunctions.random(this.area.height);
      let newNetwork = new NetworkRoot(xPos, yPos, this.params);
      this.addNetwork(newNetwork);
    }
  }

  placeNetworksInRows(){
    const solutions = LayoutUtilFunctions.computeRowsColsSpacing(this.area, this.params.num_networks);

    if (solutions.length ==0){
      console.error('Unable to compute layout');
      return;
    }

    for (var i = 0; i< solutions[0].cols; i++){
      for (var j = 0; j< solutions[0].rows; j++){
        let xPos = (1 + i) * solutions[0].spacing;
        let yPos = (1 + j) * solutions[0].spacing;
        let newNetwork = new NetworkRoot(xPos, yPos, this.params);
        this.addNetwork(newNetwork);
      }
    }
  }

  addNetwork(newNetwork){
    this.networks.push(newNetwork);
  }

  tick(){
    this.transmitNutrients();
    this.networks.forEach(p => p.tick());
  }

  transmitNutrients(){
    if (this.nutrients.length == 0){
      return;
    }

    let nearbyNutrients = this.nutrients.filter(n => {
      return this.networks.some(p => p.detectionArea.containsXY(n.x, n.y));
    });

    let allSegments = this.networks.map(p => p.segments).flat();

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
        let dist = Vector2D.dist(nSeg.nutrient.pos, segment.pos);
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

    this.networks.forEach(p => p.draw());
    pop();
  }
}