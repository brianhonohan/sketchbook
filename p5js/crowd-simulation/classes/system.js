class System {
  constructor(p_xSizeAndPos){
    this.sizeAndPosition = p_xSizeAndPos;
    this.optionsSet = new OptionsSet(this.optionsMetadata());
    this.settings = this.optionsSet.settings;
    this.regenerate();
  }

  get x(){ return this.sizeAndPosition.x; }
  get y(){ return this.sizeAndPosition.y; }
  get width(){ return this.sizeAndPosition.width; }
  get height(){ return this.sizeAndPosition.height; }

  initDoorways(){
    // Initialize doorways or other system-specific elements

    this.doorways = [];

    // one door per each side of the system
    this.doorways.push(new Doorway(
      this.x,
      this.y + (0.25 + 0.5 * random()) * this.height,
      this, color(360 * random(), 90, 90)
    ));
    this.doorways.push(new Doorway(
      this.x + this.width,
      this.y + (0.25 + 0.5 * random()) * this.height,
      this, color(360 * random(), 90, 90)
    ));
    this.doorways.push(new Doorway(
      this.x + (0.25 + 0.5 * random()) * this.width,
      this.y,
      this, color(360 * random(), 90, 90)
    ));
    this.doorways.push(new Doorway(
      this.x + (0.25 + 0.5 * random()) * this.width,
      this.y + this.height,
      this, color(360 * random(), 90, 90)
    ));
  }

  regenerate(){
    this.initDoorways();
  }

  // Return a list of Options, specific to this sketch,
  // that can be tweaked via the URL parameters
  // separate from the default P5JsSettings that are supported
  //
  // supported types: integer, float, string, bool
  optionsMetadata(){
    return [
      // { name: "varname1", type: "integer", default: 50}, 
      // { name: "varname2", type: "string", default: 'Lorem Ipsum'}, 
      // { name: "varname3", type: "float", default: 0.6}
      // { name: "varname4", type: "bool", default: false}
    ];
  }


  tick(){
    console.log("tock");
  }

  render(){
    // Render the system elements, such as doorways
    for (let i = 0; i < this.doorways.length; i++) {
      this.doorways[i].draw();
    }
    
  }
}
