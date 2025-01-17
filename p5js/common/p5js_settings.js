class P5JsSettings {
  static applySettings(newSettings){
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

  static init(){
    this.optionsSet = new OptionsSet(this.optionsMetadata());
    this.applySettings(this.optionsSet.settings);
    this.logSettings();
  }

  static logSettings(){
    console.log("P5JS Settings: ");
    console.log(this.optionsSet.settings);
  }

  static addDatGui(datGuiParams){
    datGuiParams = datGuiParams || {};
    const datGui = new dat.gui.GUI(datGuiParams);

    if (datGuiParams.autoPlace === false) {
      this.datGuiContainer = this.createDatGuiContainer();
      this.datGuiContainer.appendChild(datGui.domElement);

      document.addEventListener('keyup', function(event){
        if (event.key === 'h') {
          P5JsSettings.toggleDatGuiHide();
        }
      });
    }
    if (datGuiParams.bindOptions === true) {
      const seedListener = datGui.add(this.optionsSet.settings, "seed", 1, Number.MAX_SAFE_INTEGER);
      const noiseOctavesListener = datGui.add(this.optionsSet.settings, "noise_octaves", 1, 16);
      const noiseFallOffListener = datGui.add(this.optionsSet.settings, "noise_falloff", 0.01, 1, 0.01);

      const globalSettings = this;
      const handleDatGui = function(callback){
        globalSettings.applySettings();
        if (callback !== undefined){
          callback();
        }
      }
      seedListener.onFinishChange(() => handleDatGui(datGuiParams.callback));
      noiseOctavesListener.onFinishChange(() => handleDatGui(datGuiParams.callback));
      noiseFallOffListener.onFinishChange(() => handleDatGui(datGuiParams.callback));
    }
    return datGui;
  }

  static toggleDatGuiHide(){
    if (this.datGuiContainer.style.display === "none") {
      this.datGuiContainer.style.display = "block";
    } else {
      this.datGuiContainer.style.display = "none";
    }
  }

  static createDatGuiContainer(){
    let container = document.createElement("div"); 
    container.setAttribute('id', 'datGuiContainer');
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

  static setSeed(seed){
    this.optionsSet.settings.seed = seed;
    randomSeed(this.optionsSet.settings.seed);
    noiseSeed(this.optionsSet.settings.seed);
  }

  static getSeed(){ return this.optionsSet.settings.seed; }
}