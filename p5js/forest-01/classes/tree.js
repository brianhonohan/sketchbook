class Tree {
  constructor(x, y, age, id){
    this.id = id;
    this.x = x;
    this.y = y;
    this.age = age;
    this.height = 0;
    this.fullness = 1;
  }

  static get MAX_AGE() { return 200; } // in years
  static get YEARS_AS_SAPLING() { return 4; }
  static get YEARS_AS_MATURE() { return 140; }
  static get MAX_SHADOW_RADIUS() { return 100; }
  static get AGE_TO_MAKE_SEEDS() { return 40; }
  static get MAX_HEIGHT() { return 15; } // in meters
  static get IDEALIZED_GROWTH_WHILE_SAPLING() { 
    return 0.2 * Tree.MAX_HEIGHT / (Tree.YEARS_AS_SAPLING / System.YEARS_PER_TICK);
  }
  static get IDEALIZED_GROWTH_WHILE_MATURE() { 
    return 0.8 * Tree.MAX_HEIGHT / (Tree.YEARS_AS_MATURE / System.YEARS_PER_TICK);
  }
  static get FULLNESS_RESILIENCY() { return 0.5 / (3 / System.YEARS_PER_TICK); }
  static get FULLNESS_VULNERABILITY() { return (2 / System.YEARS_PER_TICK); }

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
    if (this.age < Tree.YEARS_AS_SAPLING) {
      return Tree.IDEALIZED_GROWTH_WHILE_SAPLING;
    }else if (this.age < (Tree.YEARS_AS_SAPLING + Tree.YEARS_AS_MATURE)) {
      return Tree.IDEALIZED_GROWTH_WHILE_SAPLING;
    }else {
      return 0;
    }
  }

  adjustFullness(resources){
    let deltaFullness = 0;
    if (resources === 1){
      deltaFullness = (1 - this.fullness) * Tree.FULLNESS_RESILIENCY;
    } else if (resources < 0){
      deltaFullness = Tree.FULLNESS_VULNERABILITY * (resources - 1);
    } else {
      // between 0-1, fullness should tend towards the 'resources' its receiving
      deltaFullness = (resources - this.fullness) * Tree.FULLNESS_RESILIENCY;
    }
    this.fullness = constrain(this.fullness + deltaFullness, 0, 1);
  }

  draw(){
    noStroke();
    fill(50, 120, 50);
    rectMode(CENTER);
    rect(this.x, this.y, 10, 10);

    let shadowWidth = this.shadowRadius() * 2;
    fill(50, 50, 50, 50);
    ellipse(this.x, this.y, shadowWidth, shadowWidth);
  }

  shadowRadius(){
    let shadowFactor = 0;
    if (this.age < Tree.YEARS_AS_SAPLING) {
      shadowFactor = map(this.age, 0, Tree.YEARS_AS_SAPLING, 0.00001, 0.2);
    } else if (this.age < Tree.YEARS_AS_MATURE) {
      shadowFactor = map(this.age, Tree.YEARS_AS_SAPLING, Tree.YEARS_AS_MATURE, 0.2, 1);
    } else {
      shadowFactor = map(this.age, Tree.YEARS_AS_MATURE, Tree.MAX_AGE, 1, 0.8);
    }
    return shadowFactor * Tree.MAX_SHADOW_RADIUS;
  }
}