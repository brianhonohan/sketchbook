class System {
  constructor(p_xSizeAndPos){
    this.area = p_xSizeAndPos;
    this.optionsSet = new OptionsSet(this.optionsMetadata());
    this.settings = this.optionsSet.settings;
    this.points = [];
 
    this.regenerate();
  }

  get x() { return this.area.x; }
  get y() { return this.area.y; }
  get width() { return this.area.width; }
  get height() { return this.area.height; }

  regenerate(modeOptions){
    let relativeRect = new Rect(0, 0, this.area.width, this.area.height);
    let relativeCircle = new Circle(this.area.width / 2,
                                    this.area.height / 2,
                                    Math.min(this.area.width, this.area.height) / 2);
    let region = relativeRect;
    
    const layoutOptions = {};
    layoutOptions.mode = this.settings.mode;

    if (layoutOptions.mode == 'around-circle' 
      || layoutOptions.mode == 'within-circle'
      || layoutOptions.mode == 'spiral-fermat')
    {
      region = relativeCircle;
    }

    const locations = LayoutUtilFunctions.getPoints(layoutOptions.mode, region,
                                               this.settings.num_points, modeOptions);
    this.placePoints(locations);

    // this.boundingRect = {xl: this.x, xr: this.x + this.width, yt: this.y, yb: this.y + this.height};
    this.boundingRect = {xl: 0, xr: this.width, yt: 0, yb: this.height};
    this.voronoiDiag = createVoronoi(this.points, this.boundingRect);
    this.voronoiDiag.fillColor = P5JsUtils.getRandomBlue();
  }

  placePoints(locations){
    for (let i = 0; i < locations.length; i++){
      if (this.points[i]){
        if (this.settings.homing_points){
          this.points[i].setTarget(new Point(locations[i][0], locations[i][1]));
        } else {
          this.points[i].x = locations[i][0];
          this.points[i].y = locations[i][1];
        }
      }
      else{
        this.points.push(new HomingPoint(locations[i][0], locations[i][1]));
      }
    }
    if (this.points.length > locations.length){
      this.points = this.points.slice(0, locations.length);
    }
  }

  // Return a list of Options, specific to this sketch,
  // that can be tweaked via the URL parameters
  // separate from the default P5JsSettings that are supported
  //
  // supported types: integer, float, string, bool
  optionsMetadata(){
    return [
      { name: "num_points", type: "integer", default: 500},
      { name: "mode", type: "String", default: 'spiral-fermat'},
      { name: "homing_points", type: "bool", default: true},
      
      // { name: "varname2", type: "string", default: 'Lorem Ipsum'}, 
      // { name: "varname3", type: "float", default: 0.6}
      // { name: "varname4", type: "bool", default: false}
    ];
  }

  tick(){
    if (this.settings.homing_points){
      for (let i = 0; i < this.points.length; i++){
        this.points[i].update();
      }
    }
    this.voronoiDiag = createVoronoi(this.points, this.boundingRect);
  }

  render(){
    drawVoronoi(this.voronoiDiag, this.x, this.y);
  }
}
