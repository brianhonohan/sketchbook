class Forest {
  constructor(area){
    this.area = area;
    this.trees = [];
    this.sproutTree(this.centerX, this.centerY);
  }

  get centerX() { return this.area.centerX; }
  get centerY() { return this.area.centerY; }

  sproutTree(x, y){
    this.trees.push( new Tree(x, y, 0) );
  }

  tick(){
    this.trees.forEach((t) => t.tick());

    this.trees = this.trees.filter(t => t.age < Tree.MAX_AGE);
  }

  draw(){
    this.trees.forEach((t) => t.draw());
  }
}