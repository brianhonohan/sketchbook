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
      { name: "cellWidth", type: "integer", default: 12}, 
      { name: "fillRect", type: "bool", default: true}, 
      { name: "rectPercent", type: "float", default: 0.5}, 
      { name: "drawGrid", type: "bool", default: false}, 
      { name: "drawLines", type: "bool", default: true}, 
      { name: "scale", type: "float", default: 0.1}, 
      { name: "xOffset", type: "integer", default: 0},
      { name: "yOffset", type: "integer", default: 0},
      { name: "zOffset", type: "float", default: 0},
      { name: "xSpeed", type: "float", default: 0.001},
      { name: "ySpeed", type: "float", default: 0.001},
      { name: "zSpeed", type: "float", default: 0.001},
      { name: "open_simplex_noise", type: "bool", default: true},
      { name: "interpolate_lines", type: "bool", default: true},
      { name: "num_levels", type: "integer", default: 6},
    ];
  }

  init(){
    this.field = new DiscreteField(this.sizeAndPosition, this);
    
    this.cellViewer = new CellViewer(this.settings.cellWidth, this.settings.cellWidth,
                                      this.field.grid, this);
  }

  updateRendering(){
    this.field.refreshTiers();
    this.cellViewer.updateSettings();
  }
  
  regenerate(){
    this.field.regenerate();
  }

  tick(){
    if (this.settings.zSpeed != 0) { 
      this.settings.xOffset += this.settings.xSpeed;
      this.settings.yOffset += this.settings.ySpeed;
      this.settings.zOffset += this.settings.zSpeed;
      this.field.regenerate();
    }
  }

  render(){
    background(50);
    this.cellViewer.renderField(this.field);
  }
}
