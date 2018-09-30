class OptionsSet {
  constructor(optionsMeta){
    this.optionsMeta = optionsMeta;
    this.settingsHash = {};
    this.init();
  }

  get optionsMetadata(){
    return this.optionsMeta;
  }

  defaultSettings(){
    let defaultValues = {};
    for (let option of this.optionsMetadata) {
      defaultValues[option.name] = option.default;
    }
    return defaultValues;
  }

  readParamOptions(){
    let paramOptions = {};
    for (let option of this.optionsMetadata) {
      paramOptions[option.name] = UtilFunctions.getParameterByName(option.name, this.formatterForType(option.type));
    }
    return paramOptions;
  }

  formatterForType(type){
    return ({
      "integer" : (parseInt),
      "float" : (Number),
      "string" :  null
    })[type];
  }

  init(){
    let paramOptions = this.readParamOptions();
    UtilFunctions.unsetUndefineds(paramOptions);

    Object.assign(this.settingsHash, this.defaultSettings(), paramOptions);
  }

  get settings(){
    return this.settingsHash;
  }

  logSettings(){
    console.log("Settings: ");
    console.log(this.settingsHash);
  }
}