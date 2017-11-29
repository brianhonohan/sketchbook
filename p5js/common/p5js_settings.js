class P5JsSettings {
  static applySettings(newSettings){
    randomSeed(this.optionsSet.settings.seed);
    noiseSeed(this.optionsSet.settings.seed);
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
}