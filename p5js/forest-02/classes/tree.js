class Tree {
  constructor(x, y, age, id, species){
    this.id = id;
    this.x = x;
    this.y = y;
    this.age = age;
    this.verticalExtent = 0;
    this.fullness = 1;

    this.species = species;
    this.computeShadowRadius();
  }

  get width() { return this.shadowRadius(); }
  get height() { return this.shadowRadius(); }

  idealizedGrowthAsSapling() { 
    return this.species.growRateWhileSapling * this.species.maxHeight / (this.species.yearsAsSapling / System.YEARS_PER_TICK);
  }
  idealizedGrowthAsMature() { 
    return this.species.growRateWhileMature * this.species.maxHeight / (this.species.yearsAsMature / System.YEARS_PER_TICK);
  }

  // This is approximately percent that a tree will recover its 'fullness' per tick if gets resources 
  // TODO: Remove magic 3 ... likely just need to adjust species' fullnessResilencyFactors 
  fullnessResiliency() { return this.species.fullnessResilencyFactor / (3 / System.YEARS_PER_TICK); }

  // This is an approximation percent of the damage done per tick if resources is are less than 0
  fullnessVulnerability() { return (this.species.fullnessVulnerabilityFactor / System.YEARS_PER_TICK); }

  // resources as a percentage of tree area
  // values 0 - 1
  tick(resources){
    this.age += System.YEARS_PER_TICK;
    this.verticalExtent += Math.max(resources, 0) * this.growthRate();
    this.adjustFullness(resources);
    this.computeShadowRadius();
  }

  distFrom(otherTree){
    return UtilFunctions.dist(this.x, this.y,
                                otherTree.x, otherTree.y);
  }

  growthRate(){
    if (this.age < this.species.yearsAsSapling) {
      return this.idealizedGrowthAsSapling();
    }else if (this.age < (this.species.yearsAsSapling + this.species.yearsAsMature)) {
      return this.idealizedGrowthAsMature();
    }else {
      return 0;
    }
  }

  adjustFullness(resources){
    let deltaFullness = 0;
    if (resources === 1){
      deltaFullness = (1 - this.fullness) * this.fullnessResiliency();
    } else if (resources < 0){
      deltaFullness = this.fullnessVulnerability() * (resources - 1);
    } else {
      // between 0-1, fullness should tend towards the 'resources' its receiving
      // TODO: use fullnessResiliency when growing; fullness < resources
      // TODO: use fullnessVulnerability when suffering; fullness > resources
      deltaFullness = (resources - this.fullness) * this.fullnessResiliency();
    }
    this.fullness = constrain(this.fullness + deltaFullness, 0, 1);
  }

  draw(){
    noStroke();
    fill(this.species.trunkColor);
    rectMode(CENTER);
    let trunkSize = lerp(1, 10, this.age / this.species.maxAge);
    rect(this.x, this.y, trunkSize, trunkSize);

    let shadowWidth = this.shadowRadius() * 2;
    fill(200, 200, 200, 50);
    ellipse(this.x, this.y, shadowWidth, shadowWidth);
  }

  shadowRadius(){ return this._shadowRadius; }
  computeShadowRadius(){
    // TODO: Factor in Fullness
    // TODO: Split from above and below ground
    let shadowFactor = 0;
    if (this.age < this.species.yearsAsSapling) {
      shadowFactor = map(this.age, 0, this.species.yearsAsSapling, 0.00001, 0.2);
    } else if (this.age < this.species.yearsAsMature) {
      shadowFactor = map(this.age, this.species.yearsAsSapling, this.species.yearsAsMature, 0.2, 1);
    } else {
      shadowFactor = map(this.age, this.species.yearsAsMature, this.species.maxAge, 1, 0.8);
    }
    this._shadowRadius =  shadowFactor * this.species.maxShadowRadius;
  }
}