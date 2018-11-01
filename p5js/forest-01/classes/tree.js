class Tree {
  constructor(x, y, age, id){
    this.id = id;
    this.x = x;
    this.y = y;
    this.age = age;
  }

  static get MAX_AGE() { return 200; } // in years
  static get YEARS_AS_SAPLING() { return 4; }
  static get YEARS_AS_MATURE() { return 140; }
  static get MAX_SHADOW_RADIUS() { return 100; }
  static get AGE_TO_MAKE_SEEDS() { return 40; }

  tick(){
    this.age += System.YEARS_PER_TICK;
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
      shadowFactor = map(this.age, 0, Tree.YEARS_AS_SAPLING, 0, 0.2);
    } else if (this.age < Tree.YEARS_AS_MATURE) {
      shadowFactor = map(this.age, Tree.YEARS_AS_SAPLING, Tree.YEARS_AS_MATURE, 0.2, 1);
    } else {
      shadowFactor = map(this.age, Tree.YEARS_AS_MATURE, Tree.MAX_AGE, 1, 0.8);
    }
    return shadowFactor * Tree.MAX_SHADOW_RADIUS;
  }
}