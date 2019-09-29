class Gate extends CircuitBase {
  constructor(settings){
    super(settings);
    this.numInputs = 2;
    this.numOutputs = 1;
    this.type = this.settings.type;
  }

  set type(newType){
    this.settings.type = newType;
    this.operation = Logic.opForCode(this.settings.type);
    this.label = Logic.symbolForOp(this.settings.type);
  }

  output(){
    return this.operation.apply(null, this.inputs.map(i => i.output()));
  }
}
