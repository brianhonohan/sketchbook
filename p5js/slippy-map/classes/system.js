class System {
  constructor(p_xSizeAndPos){
    this.sizeAndPosition = p_xSizeAndPos;
    this.optionsSet = new OptionsSet(this.optionsMetadata());
    this.settings = this.optionsSet.settings;

    this.tileRenderer = new TileRenderer();
    this.slippyMap = new SlippyMap(this.utilRectWithMargin(0.1), this.tileRenderer);
  }

  get x() { return this.sizeAndPosition.x; }
  get y() { return this.sizeAndPosition.y; }
  get width() { return this.sizeAndPosition.width; }
  get height() { return this.sizeAndPosition.height; }

  utilRectWithMargin(margin){
    return new Rect(this.width * margin, this.height * margin, 
                    this.width * (1 - 2 * margin), this.height * (1 - 2 * margin));
  }

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
  }

  render(){
    this.slippyMap.render();
  }

  ui_controller__mouseWheel(event){
    if (this.slippyMap.containsXY(mouseX, mouseY)){
      // not sure why my browser is returning +/- 68 when scrolling with mouse wheel,
      // and values closer to +/- 1 when two-finger scrolling with track pad
      // related to browser zoom level; maybe some OS level settings.
      this.slippyMap.adjustZoom(event.delta / 68);
      return false;
    }

    return true; // Propagate the event if not handled.
  }

  ui_controller__mousePressed(x,y){
    if (this.slippyMap.handleMousePressed(x,y)){
      return true;
    }
  }

  ui_controller__mouseReleased(x,y){
    if (this.slippyMap.handleMouseReleased(x,y)){
      return true;
    }
  }

  ui_controller__mouseDragged(x, y, prevX, prevY){
    if (this.slippyMap.uiIsDragging){
      this.slippyMap.handleMouseDragged(x, y, prevX, prevY);
      return true;
    }
  }
}
