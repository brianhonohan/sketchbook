class Input extends CircuitBase {
  constructor(settings){
    super();

    this.numOutputs = 1;
    this.settings = settings;
    this.initOutputs();
  }

  get label(){
    return `I = ${this.output()}`;
  }

  output(){
    return this.settings.signal;
  }

  initOutputs(){
    this.outputs[0] = this.output; 
  }
}
