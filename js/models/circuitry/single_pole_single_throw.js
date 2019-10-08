class SinglePoleSingleThrow extends Gate {
  constructor(settings){
    super(settings);
    this.closed = this.settings.closed;
    this.numInputs = 1;
    this.numOutputs = 1;
  }

  output(){
    if (this.closed){
      return this.inputs[0].output();
    } else {
      return 0;
    }
  }

  handleToggleStart(){
    this.closed = (this.closed + 1) % 2;
  }
}
