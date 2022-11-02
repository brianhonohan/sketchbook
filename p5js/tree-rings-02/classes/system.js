class System {
  constructor(p_xSizeAndPos){
    this.sizeAndPosition = p_xSizeAndPos;
    this.optionsSet = new OptionsSet(this.optionsMetadata());
    this.settings = this.optionsSet.settings;

    let trunkSize = this.sizeAndPosition.getConcentric(0.80);
    this.trunk = new TreeTrunk(trunkSize, this);
    this.init();
  }

  optionsMetadata(){
    return [
    ];
  }

  init(){
    this.trunk.init();
  }

  tick(){
    // this.trunk.tick();
  }

  render(){
    this.trunk.draw();
  }
}
