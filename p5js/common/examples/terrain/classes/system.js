class System {
  constructor(p_xSizeAndPos){
    this.sizeAndPosition = p_xSizeAndPos;
    this.optionsSet = new OptionsSet(this.optionsMetadata());
    this.settings = this.optionsSet.settings;
    this.redraw = true;

    this.init();
  }

  // Return a list of Options, specific to this sketch,
  // that can be tweaked via the URL parameters
  // separate from the default P5JsSettings that are supported
  //
  // supported types: integer, float, string, bool
  optionsMetadata(){
    return [
      { name: "cellWidth", type: "integer", default: 8}, 
      { name: "fillRect", type: "bool", default: true}, 
      { name: "rectPercent", type: "float", default: 1}, 
      { name: "drawGrid", type: "bool", default: false}, 
      { name: "gridResolution", type: "integer", default: 10}, 
      { name: "drawLines", type: "bool", default: true}, 
      { name: "scale", type: "float", default: 0.01}, 
      { name: "xOffset", type: "integer", default: 0},
      { name: "yOffset", type: "integer", default: 0},
      { name: "zOffset", type: "float", default: 0},
      { name: "xSpeed", type: "float", default: 0},
      { name: "ySpeed", type: "float", default: 0},
      { name: "zSpeed", type: "float", default: 0.0000},
      { name: "open_simplex_noise", type: "bool", default: false},
      { name: "interpolate_lines", type: "bool", default: true},
      { name: "num_levels", type: "integer", default: 16},
      { name: "bin_colors", type: "bool", default: false},
    ];
  }

  init(){
    this.field = new Terrain(this.sizeAndPosition, this.settings);
    // TODO: Remove the need to regerate again
    // this is necessary bease of the dynamic injection of the p5.js noise()
    // ... which is only done after the object is created
    // ... thus the first internal regenerate() call in the constructor
    // ... is a waste of startup computation time.
    // ...
    // ... But want to strike balance with reasonable assumption that 
    // ... the class auto-generatees once; so many a way to suppress it
    this.regenerate();
    this.terrainViewer = new TerrainViewer(this.settings.cellWidth, this.settings.cellWidth,
                                      this.field.grid, this);
  }

  updateRendering(){
    this.field.refreshTiers();
    this.terrainViewer.updateSettings();
    this.redraw = true;
  }

  applyNoiseSettings(){
    if (this.settings.open_simplex_noise){
      this.field.resetToDefaultNoise();
    } else {
      this.field.setNoiseFunction( (x,y,z) => { return 2 * noise(x,y,z);} );
    }
  }
  
  regenerate(){
    this.applyNoiseSettings();
    this.field.regenerate();
    this.redraw = true;
  }

  tick(){
    if (this.settings.xSpeed != 0 || this.settings.ySpeed != 0 || this.settings.zSpeed != 0) { 
      this.settings.xOffset += this.settings.xSpeed;
      this.settings.yOffset += this.settings.ySpeed;
      this.settings.zOffset += this.settings.zSpeed;
      this.field.regenerate();
      this.redraw = true;
    }
  }

  render(){
    if (this.redraw == false) {
      return;
    }
    background(50);
    this.terrainViewer.renderField(this.field);
    this.redraw = false;
  }
}
