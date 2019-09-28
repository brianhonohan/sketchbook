class Input extends CircuitBase {
  constructor(settings){
    super();

    this.numOutputs = 1;
    this.settings = settings;
  }

  get label(){
    return `I = ${this.output()}`;
  }

  output(){
    return this.settings.signal;
  }
}
