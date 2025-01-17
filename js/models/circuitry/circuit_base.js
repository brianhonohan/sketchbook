class CircuitBase {
  constructor(settings){
    this.applySettings(settings);
    this.inputs     = [];
    this.outputs    = [];
    this.numInputs  = 0;
    this.numOutputs = 0;
  }

  get ANY_OUTPUT(){ return -1; }

  defaultSettings(){
    return {};
  }

  applySettings(settings){
    this.settings = Object.assign(this.defaultSettings(), settings);
  }

  bindInput(node, index = 0){
    if (index > (this.numInputs-1)){
      return;
    }
    this.inputs[index] = node;
  }

  bindOutput(node, index = 0){
    if (index > (this.numOutputs-1)){
      return;
    }
    if (this.outputs[index] == undefined){
      this.outputs[index] = [];
    }
    this.outputs[index].push(node);
  }
}
