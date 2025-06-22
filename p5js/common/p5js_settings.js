class P5JsSettings {
  static applySettings(){
    this.setSeed(this.optionsSet.settings.seed);
    noiseDetail(this.optionsSet.settings.noise_octaves, this.optionsSet.settings.noise_falloff);
  }

  static optionsMetadata() {
    return [
      { name: "seed", type: "integer", default: Math.round(random(1000))}, 
      { name: "noise_octaves", type: "integer", default: 10}, 
      { name: "noise_falloff", type: "float", default: 0.6}
    ];
  }

  static init(sketchDefaults = {}){
    const optMetadata = this.optionsMetadata();

    // Allow sketches to hard-code defaults that layer on top of the 
    // defaults defined in this base class
    // with intent of layering data as follows:
    // Defaults from P5jsSettings
    // Sketch defaults (if present)
    // URL params (if present), handled by OptionsSet
    if (Object.keys(sketchDefaults).length > 0) {
      for(let i = 0; i < optMetadata.length; i++){
        if ( sketchDefaults[optMetadata[i].name] != undefined ){
          optMetadata[i].default = sketchDefaults[optMetadata[i].name];
        }
      }
    }
    
    this.optionsSet = new OptionsSet(optMetadata);
    this.applySettings(this.optionsSet.settings);
    this.logSettings();
  }

  static logSettings(){
    console.log("P5JS Settings: ");
    console.log(this.optionsSet.settings);
  }

  static addDatGui(datGuiParams){
    return this.addGui(datGuiParams);
  }
    
  static addGui(guiParams){
    guiParams = guiParams || {};
    const gui = (typeof lil === 'object') ? new lil.GUI(guiParams) : new dat.gui.GUI(guiParams);

    if (guiParams.autoPlace === false) {
      this.guiContainer = this.createGuiContainer();
      this.guiContainer.appendChild(gui.domElement);

      document.addEventListener('keyup', function(event){
        if (event.key === 'h') {
          P5JsSettings.toggleGuiHide();
        }
      });
    }

    if (guiParams.width !== undefined){
      gui.domElement.style['width'] = `${guiParams.width}px`;
    }
    if (guiParams.bindOptions === true) {
      const commonGui = gui.addFolder("Common Settings");
      const seedListener = commonGui.add(this.optionsSet.settings, "seed", 1, Number.MAX_SAFE_INTEGER);
      const noiseOctavesListener = commonGui.add(this.optionsSet.settings, "noise_octaves", 1, 16);
      const noiseFallOffListener = commonGui.add(this.optionsSet.settings, "noise_falloff", 0.01, 1, 0.01);

      const globalSettings = this;
      const handleGuiChanges = function(callback){
        globalSettings.applySettings();
        if (callback !== undefined){
          callback();
        }
      }
      seedListener.onFinishChange(() => handleGuiChanges(guiParams.callback));
      noiseOctavesListener.onFinishChange(() => handleGuiChanges(guiParams.callback));
      noiseFallOffListener.onFinishChange(() => handleGuiChanges(guiParams.callback));
    }
    return gui;
  }

  static toggleGuiHide(){
    if (this.guiContainer.style.display === "none") {
      this.guiContainer.style.display = "block";
    } else {
      this.guiContainer.style.display = "none";
    }
  }

  static createGuiContainer(){
    let container = document.createElement("div"); 
    container.setAttribute('id', 'guiContainer');
    container.style.position = 'absolute';
    container.style.right = '0px';
    container.style.bottom = '20px';

    let label = document.createElement('div');
    label.style.color = 'white';
    label.style.backgroundColor = 'black';
    label.style.padding = '5px';
    label.style.font = "11px 'Lucida Grande',sans-serif";
    label.innerHTML = "Config (Press H to Hide/Show)";
    container.appendChild(label);

    document.body.appendChild(container);
    return container;
  }

  static collapseGuiIfNarrow(gui){
    if (window.innerWidth < 500) {
      gui.close();
    }
  }

  static setSeed(seed){
    this.optionsSet.settings.seed = seed;
    randomSeed(this.optionsSet.settings.seed);
    noiseSeed(this.optionsSet.settings.seed);
  }

  static getSeed(){ return this.optionsSet.settings.seed; }
}