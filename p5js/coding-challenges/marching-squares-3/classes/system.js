class System {
  constructor(p_xSizeAndPos){
    this.sizeAndPosition = p_xSizeAndPos;
    this.optionsSet = new OptionsSet(this.optionsMetadata());
    this.settings = this.optionsSet.settings;

    this.init();
  }

  // Return a list of Options, specific to this sketch,
  // that can be tweaked via the URL parameters
  // separate from the default P5JsSettings that are supported
  //
  // supported types: integer, float, string, bool
  optionsMetadata(){
    return [
      { name: "cellWidth", type: "integer", default: 20}, 
      { name: "fillRect", type: "bool", default: true}, 
      { name: "drawGrid", type: "bool", default: false}, 
      { name: "scale", type: "float", default: 0.1}, 
      { name: "xOffset", type: "integer", default: 0},
      { name: "yOffset", type: "integer", default: 0},
      { name: "zOffset", type: "float", default: 0},
      { name: "zSpeed", type: "float", default: 0.001},
      { name: "open_simplex_noise", type: "bool", default: true},
      { name: "interpolate_lines", type: "bool", default: true},
      { name: "num_levels", type: "integer", default: 3},
    ];
  }

  init(){
    this.field = new DiscreteField(this.sizeAndPosition, this);
    
    this.cellViewer = new CellViewer(this.settings.cellWidth, this.settings.cellWidth,
                                      this.field.grid, this);
  }

  updateRendering(){
    this.cellViewer.updateSettings();
  }
  
  regenerate(){
    this.field.regenerate();
  }

  tick(){
    if (this.settings.zSpeed != 0) { 
      this.settings.zOffset += this.settings.zSpeed;
      this.field.regenerate();
    }
  }

  render(){
    background(50);
    this.cellViewer.renderField(this.field);
  }
}
