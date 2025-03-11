class System {
  constructor(p_xSizeAndPos){
    this.area = p_xSizeAndPos;
    this.optionsSet = new OptionsSet(this.optionsMetadata());
    this.settings = this.optionsSet.settings;
    this.points = [];
 
    this.regenerate();
  }

  regenerate(){
    let relativeRect = new Rect(0, 0, this.area.width, this.area.height);
    let relativeCircle = new Circle(this.area.width / 2,
                                    this.area.height / 2,
                                    Math.min(this.area.width, this.area.height) / 2);
    let region = relativeRect;
    if (this.settings.mode == 'around-circle' || this.settings.mode == 'within-circle'){
      region = relativeCircle;
    }
    
    const layoutOptions = {};
    layoutOptions.mode = this.settings.mode;

    if (layoutOptions.mode == 'around-circle' 
      || layoutOptions.mode == 'within-circle'
      || layoutOptions.mode == 'within-circle-gaussian'
      || layoutOptions.mode == 'spiral-fermat')
    {
      region = relativeCircle;
    }
    // hacky way to handle the 'within-circle-gaussian' case
    if (layoutOptions.mode == 'within-circle-gaussian'){
      layoutOptions.mode = 'within-circle';
      layoutOptions.randFunc = 'gaussianConstrained';
      layoutOptions.gaussianShape = 'build-up-to-radius';
    }

    const locations = LayoutUtilFunctions.getPoints(layoutOptions.mode, region,
                                               this.settings.num_points, layoutOptions);
    this.placePoints(locations);
  }

  placePoints(locations){
    for (let i = 0; i < locations.length; i++){
      if (this.points[i]){
        this.points[i].x = locations[i][0];
        this.points[i].y = locations[i][1];
      }
      else{
        this.points.push(new Point(locations[i][0], locations[i][1]));
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
      
      // { name: "varname2", type: "string", default: 'Lorem Ipsum'}, 
      // { name: "varname3", type: "float", default: 0.6}
      // { name: "varname4", type: "bool", default: false}
    ];
  }

  tick(){
  }

  render(){
    push();
    translate(this.area.x, this.area.y);
    stroke(180);
    strokeWeight(6);
    for (let i = 0; i < this.points.length; i++){
      this.points[i].draw();
    }
    pop();
  }
}
