class CircuitBase {
  constructor(){
    this.inputs     = [];
    this.outputs     = [];
    this.numInputs  = 0;
    this.numOutputs = 0;
  }

  numOutputs(){
    return this.outputs.length;
  }

  tick(){
  }
}
