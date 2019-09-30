class PushSwitch extends Gate {
  constructor(settings){
    super(settings);
    this.numInputs = 1;
    this.closed = this.settings.closed;
    this.label = '';
  }

  output(){
    if (this.closed){
      return this.inputs[0].output();
    } else {
      return 0;
    }
  }

  handleUserToggle(){
    this.closed = (this.closed + 1) % 2;
  }
}