class P5JsSettings {
  constructor(){
    this.settings = {};
  }

  applySettings(newSettings){
    Object.assign(this.settings, newSettings);

    randomSeed(this.settings.seed);
    noiseSeed(this.settings.seed);
    noiseDetail(this.settings.noise_octaves, this.settings.noise_falloff);
  }
  
  static optionsMetaData() {
    return [
      { name: "seed", type: "integer", default: Math.round(random(1000))}, 
      { name: "noise_octaves", type: "integer", default: 10}, 
      { name: "noise_falloff", type: "float", default: 0.6}
    ];
  }

  static defaultSettings(){
    let defaultValues = {};
    for (let option of this.optionsMetaData()) {
      defaultValues[option.name] = option.default;
    }
    return defaultValues;
  }

  static readParamOptions(){
    let paramOptions = {};
    for (let option of this.optionsMetaData()) {
      paramOptions[option.name] = UtilFunctions.getParameterByName(option.name, this.formatterForType(option.type));
    }
    return paramOptions;
  }

  static formatterForType(type){
    ({
      "integer" : (parseInt),
      "float" : (Number),
      "string" :  null
    })[type];
  }

  static init(options = {}){
    this.instance = new P5JsSettings();

    let paramOptions = this.readParamOptions();
    UtilFunctions.unsetUndefineds(paramOptions);

    let settingsToApply = {}
    Object.assign(settingsToApply, this.defaultSettings(), paramOptions);
    this.instance.applySettings(settingsToApply);

    this.logSettings();
  }

  static currentSettings(){
    return this.instance.settings;
  }

  static logSettings(){
    console.log("P5JS Settings: ");
    console.log(this.currentSettings());
  }
}