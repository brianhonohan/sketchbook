class System {
  constructor(p_xSizeAndPos){
    this.sizeAndPosition = p_xSizeAndPos;
    this.optionsSet = new OptionsSet(this.optionsMetadata());
    this.settings = this.optionsSet.settings;

    this.terrainGen = new TerrainGenerator();
    this.init();
  }

  optionsMetadata(){
    return [
      // { name: "varname1", type: "integer", default: 50}, 
      // { name: "varname2", type: "string", default: 'Lorem Ipsum'}, 
      // { name: "varname3", type: "float", default: 0.6}
    ];
  }

  init(){
    this.ridges = this.terrainGen.generate(this.sizeAndPosition);
  }

  tick(){
    // console.log("tock");
  }

  render(){
    stroke(colorScheme.line);
    for (var i = 0; i < (this.ridges.length - 1); i++){
      let ridge = this.ridges[i];
      let nextRidge = this.ridges[i+1];
      line(ridge.x, ridge.y, nextRidge.x, nextRidge.y);
    }
  }
}
