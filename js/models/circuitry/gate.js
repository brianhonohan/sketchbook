class Gate extends CircuitBase {
  constructor(settings){
    super();
    this.numInputs = 2;
    this.numOutputs = 1;
    this.settings = settings;
    this.operation = Logic.opForCode(settings.type);
    this.label = Logic.symbolForOp(this.settings.type);
  }

  output(){
    return this.operation.apply(null, this.inputs);
  }
}
