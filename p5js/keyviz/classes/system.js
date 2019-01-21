class System {
  constructor(p_xSizeAndPos){
    this.sizeAndPosition = p_xSizeAndPos;
    this.optionsSet = new OptionsSet(this.optionsMetadata());
    this.settings = this.optionsSet.settings;

    let rectSize = new Rect(0,40,300,120);
    this.keyboard = new Keyboard(rectSize);

    let panelSize = new Rect(300,50,200,220);
    this.controlPanel = new KeyvizControlPanel(panelSize);
  }

  // Return a list of Options, specific to this sketch,
  // that can be tweaked via the URL parameters
  // separate from the default P5JsSettings that are supported
  //
  // supported types: integer, float, string
  optionsMetadata(){
    return [
      { name: "cellWidth", type: "integer", default: 50}, 
      // { name: "varname2", type: "string", default: 'Lorem Ipsum'}, 
      // { name: "varname3", type: "float", default: 0.6}
    ];
  }

  handleKeyTyped(){
    this.keyboard.showPressedKey(key.charCodeAt(0));
  }

  handleMousePressed(){
    this.controlPanel.handleMousePressed();
  }

  handleMouseReleased(){
    this.controlPanel.handleMouseReleased();
  }

  tick(){
  }

  draw(){
    this.controlPanel.draw();
  }
}
