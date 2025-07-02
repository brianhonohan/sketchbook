class System {
  constructor(p_xSizeAndPos){
    this.sizeAndPosition = p_xSizeAndPos;
    this.optionsSet = new OptionsSet(this.optionsMetadata());
    this.settings = this.optionsSet.settings;
    this.regenerate();
  }

  regenerate(){
    this.innerArea = {
      xl: this.sizeAndPosition.x + this.sizeAndPosition.width * 0.1,
      xr: this.sizeAndPosition.x + this.sizeAndPosition.width * 0.9,
      yt: this.sizeAndPosition.y + this.sizeAndPosition.height * 0.1,
      yb: this.sizeAndPosition.y + this.sizeAndPosition.height * 0.9
    };

    this.points = this.randomPointsWithin(this.settings.numCells, this.innerArea);
    this.voronoiDiag = createVoronoi(this.points, this.innerArea);
  }

  randomPointsWithin(number, bbox){
    return Array(number)
            .fill()
            .map(() => ({x: random(bbox.xl, bbox.xr), y: random(bbox.yt, bbox.yb)}));
  }

  // Return a list of Options, specific to this sketch,
  // that can be tweaked via the URL parameters
  // separate from the default P5JsSettings that are supported
  //
  // supported types: integer, float, string, bool
  optionsMetadata(){
    return [
      { name: "numCells", type: "integer", default: 15}, 
      // { name: "varname2", type: "string", default: 'Lorem Ipsum'}, 
      // { name: "varname3", type: "float", default: 0.6}
      // { name: "varname4", type: "bool", default: false}
    ];
  }

  tick(){
    // console.log("tock");
  }

  render(){
    voronoiSiteStrokeWeight(2);
    voronoiSiteStroke(color(50,230,50));

    fill(50);
    stroke(230);
    strokeWeight(0.5);
    drawVoronoi(this.voronoiDiag, 0, 0);
  }
}
