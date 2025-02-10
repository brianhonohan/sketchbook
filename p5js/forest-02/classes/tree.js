class Tree {
  constructor(x, y, age, id, species){
    this.id = id;
    this.x = x;
    this.y = y;
    this.age = age;
    this.height = 0;
    this.fullness = 1;

    this.species = species;
  }

  idealizedGrowthAsSapling() { 
    return this.species.growRateWhileSapling * this.species.maxHeight / (this.species.yearsAsSapling / System.YEARS_PER_TICK);
  }
  idealizedGrowthAsMature() { 
    return this.species.growRateWhileMature * this.species.maxHeight / (this.species.yearsAsMature / System.YEARS_PER_TICK);
  }
  fullnessResiliency() { return this.species.fullnessResilencyFactor / (3 / System.YEARS_PER_TICK); }
  fullnessVulnerability() { return (this.species.fullnessVulnerabilityFactor / System.YEARS_PER_TICK); }

  tick(resources){
    this.age += System.YEARS_PER_TICK;
    this.height += Math.max(resources, 0) * this.growthRate();
    this.adjustFullness(resources);
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

  shadowRadius(){
    let shadowFactor = 0;
    if (this.age < this.species.yearsAsSapling) {
      shadowFactor = map(this.age, 0, this.species.yearsAsSapling, 0.00001, 0.2);
    } else if (this.age < this.species.yearsAsMature) {
      shadowFactor = map(this.age, this.species.yearsAsSapling, this.species.yearsAsMature, 0.2, 1);
    } else {
      shadowFactor = map(this.age, this.species.yearsAsMature, this.species.maxAge, 1, 0.8);
    }
    return shadowFactor * this.species.maxShadowRadius;
  }
}