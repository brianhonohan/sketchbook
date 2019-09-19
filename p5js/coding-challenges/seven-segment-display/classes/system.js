class System {
  constructor(p_xSizeAndPos){
    this.sizeAndPosition = p_xSizeAndPos;
    this.optionsSet = new OptionsSet(this.optionsMetadata());
    this.settings = this.optionsSet.settings;


    this.marginX = 0.2 * this.width;
    this.marginY = 0.2 * this.height;
    let digitPlacement = new Rect(this.x + this.marginX, this.y + this.marginY, 
                                    this.width - 2 * this.marginX,
                                    this.height - 2 * this.marginY);
    this.sevenSegDisplay = new SevenSegmentDisplay(digitPlacement)
  }

  get x(){ return this.sizeAndPosition.x; }
  get y(){ return this.sizeAndPosition.y; }
  get width(){ return this.sizeAndPosition.width; }
  get height(){ return this.sizeAndPosition.height; }

  // Return a list of Options, specific to this sketch,
  // that can be tweaked via the URL parameters
  // separate from the default P5JsSettings that are supported
  //
  // supported types: integer, float, string
  optionsMetadata(){
    return [
      // { name: "cellWidth", type: "integer", default: 50}, 
      // { name: "varname2", type: "string", default: 'Lorem Ipsum'}, 
      // { name: "varname3", type: "float", default: 0.6}
    ];
  }

  tick(){
    // console.log("tock");
  }

  render(){
    background(50);
    this.sevenSegDisplay.draw();
  }
}
