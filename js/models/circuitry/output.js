class Output extends CircuitBase {
  constructor(){
    super();
    this.numInputs = 1;
    this.label = "O";
  }

  output(){
    return this.inputs[0].output();
  }

  input(){
    return this.output();
  }
}
