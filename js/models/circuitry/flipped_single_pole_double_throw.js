class FlippedSinglePoleDoubleThrow extends Gate {
  constructor(settings){
    super(settings);
    this.activeInput = this.settings.activeInput;
  }

  output(){
    return this.inputs[this.activeInput].output();
  }

  handleToggleStart(){
    this.activeInput = (this.activeInput + 1) % 2;
  }
}