class SinglePoleDoubleThrow extends Gate {
  constructor(settings){
    super(settings);
    this.numInputs = 1;
    this.numOutputs = 2;

    this.activeOutput = this.settings.activeOutput;
  }

  output(index){
    if (index == this.activeOutput) {
      return this.inputs[0].output();
    } else {
      return 0;
    }
  }

  handleToggleStart(){
    this.activeOutput = (this.activeOutput + 1) % 2;
  }
}
