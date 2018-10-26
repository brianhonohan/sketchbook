class Tree {
  constructor(x, y, age){
    this.x = x;
    this.y = y;
    this.age = age;
  }

  static get MAX_AGE() { return 2000; }

  tick(){
    this.age += 1;
  }

  draw(){
    noStroke();
    fill(50, 120, 50);
    rectMode(CENTER);
    rect(this.x, this.y, 10, 10);
  }
}