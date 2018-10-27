class Tree {
  constructor(x, y, age){
    this.x = x;
    this.y = y;
    this.age = age;
  }

  static get MAX_AGE() { return 200; } // in years
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
    if (this.age < 4) {
      shadowFactor = map(this.age, 0, 40, 0, 0.2);
    } else if (this.age < 150) {
      shadowFactor = map(this.age, 40, 150, 0.2, 1);
    } else {
      shadowFactor = map(this.age, 150, Tree.MAX_AGE, 1, 0.8);
    }
    return shadowFactor * Tree.MAX_SHADOW_RADIUS;
  }
}