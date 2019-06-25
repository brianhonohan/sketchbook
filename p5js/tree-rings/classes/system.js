class System {
  constructor(p_xSizeAndPos){
    this.sizeAndPosition = p_xSizeAndPos;
    this.optionsSet = new OptionsSet(this.optionsMetadata());
    this.settings = this.optionsSet.settings;

    let trunkSize = this.sizeAndPosition.getConcentric(0.80);
    this.trunk = new TreeTrunk(trunkSize, this, this.settings.initialCells);
  }

  optionsMetadata(){
    return [
      { name: "initialCells", type: "integer", default: 50}
    ];
  }

  tick(){
  }

  render(){
    this.trunk.draw();
  }
}
