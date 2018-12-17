class System {
  constructor(p_xSizeAndPos){
    this.area = p_xSizeAndPos;
  }

  get x() { return this.area.x; }
  get y() { return this.area.y; }

  optionsMetadata(){
    return [
    ];
  }

  tick(){
    // console.log("tock");
  }

  draw(){
    push();
    translate(this.x, this.y);
    pop();
  }
}
