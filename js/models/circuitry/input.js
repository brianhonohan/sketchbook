class Input extends CircuitBase {
  constructor(settings){
    super(settings);
    this.numOutputs = 1;
  }

  get label(){
    return `I = ${this.output()}`;
  }

  output(){
    return this.settings.signal;
  }
}
