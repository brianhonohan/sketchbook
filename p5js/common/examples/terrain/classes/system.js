class System {
  constructor(p_xSizeAndPos){
    this.sizeAndPosition = p_xSizeAndPos;
    this.optionsSet = new OptionsSet(this.optionsMetadata());
    this.settings = this.optionsSet.settings;
    this.redraw = true;
    this.needRegeneration = false;
    this.terrainViewerX = 0;
    this.terrainViewerY = 0;

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
      { name: "base_layer", type: "string", default: 'Elevation'},
      { name: "interpolate_lines", type: "bool", default: true},
      { name: "num_levels", type: "integer", default: 16},
      { name: "bin_colors", type: "bool", default: false},
    ];
  }

  getBaseLayerOptions(){
    return this.terrainViewer.getBaseLayerOptions();
  }

  init(){
    this.bufferedArea = this.sizeAndPosition.copy();
    this.bufferSize = this.settings.cellWidth;
    this.bufferedArea.x -= this.bufferSize;
    this.bufferedArea.y -= this.bufferSize;
    this.bufferedArea.width += 2 * this.bufferSize;
    this.bufferedArea.height += 2 * this.bufferSize;

    this.field = new Terrain(this.bufferedArea, this.settings);
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
    // console.log("Regenerating terrain with settings: ");
    this.applyNoiseSettings();
    this.field.regenerate();
    this.redraw = true;
    this.needRegeneration = false;
  }

  tick(){
    if (this.settings.xSpeed === 0 && this.settings.ySpeed === 0 && this.settings.zSpeed === 0) { 
      return;
    }
    this.redraw |= true;

    let regenThreshold = 1; // this.bufferSize;
    this.terrainViewerX += this.settings.xSpeed;
    if ( Math.abs(this.terrainViewerX) >= regenThreshold) {
      let remainder = this.terrainViewerX % regenThreshold;
      this.settings.xOffset += (this.terrainViewerX - remainder);
      this.terrainViewerX = remainder;
      this.needRegeneration |= true;
    }

    this.terrainViewerY += this.settings.ySpeed;
    if ( Math.abs(this.terrainViewerY) >= regenThreshold) {
      let remainder = this.terrainViewerY % regenThreshold;
      this.settings.yOffset += (this.terrainViewerY - remainder);
      this.terrainViewerY = remainder;
      this.needRegeneration |= true;
    }

    if (this.settings.zSpeed != 0) {
      this.settings.zOffset += this.settings.zSpeed;
      this.needRegeneration |= true;
    }

    if (this.needRegeneration) {
      this.regenerate();
    } 
    // else {
    //   console.log("No regeneration needed");
    // }
  }

  render(){
    if (this.redraw === false) {
      return;
    }
    background(50);
    push();

    let xOffset = Math.floor(0 - this.bufferedArea.x + this.terrainViewerX);
    let yOffset = Math.floor(0 - this.bufferedArea.y + this.terrainViewerY);
    translate(xOffset, yOffset);
    
    this.terrainViewer.renderField(this.field);
    pop();
    this.redraw = false;
  }
}
