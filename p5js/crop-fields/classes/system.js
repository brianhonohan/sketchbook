class System {
  constructor(p_xSizeAndPos){
    this.sizeAndPosition = p_xSizeAndPos;
    this.optionsSet = new OptionsSet(this.optionsMetadata());
    this.settings = this.optionsSet.settings;
    this.plots = [];
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

    for(let i = 0; i < this.settings.numCells; i++){
      const plot = this.getOrCreatePlot(i);
      plot.setVoronoiCell(this.voronoiDiag.cells[i]);
    }

    // trim this.plots to the number of cells
    this.plots = this.plots.slice(0, this.settings.numCells);
  }

  getOrCreatePlot(index){
    if (index >= this.plots.length){
      const plot = new CropFieldPlot(this);
      this.plots.push(plot);
      return plot;
    }
    return this.plots[index];
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
      { name: "numCells", type: "integer", default: 2}, 
      { name: "cropSpacing", type: "integer", default: 200}, 
      // { name: "varname2", type: "string", default: 'Lorem Ipsum'}, 
      // { name: "varname3", type: "float", default: 0.6}
      // { name: "varname4", type: "bool", default: false}
    ];
  }

  tick(){
    // console.log("tock");
  }

  render(){
    // this.drawVoronoiDiagram();
    background(50);
    this.plots.forEach(plot => {
      plot.draw();
    });
  }

  drawVoronoiDiagram(){
    voronoiSiteStrokeWeight(2);
    voronoiSiteStroke(color(50,230,50));

    fill(50);
    stroke(230);
    strokeWeight(0.5);
    drawVoronoi(this.voronoiDiag, 0, 0, {redrawAll: false});
  }
}
