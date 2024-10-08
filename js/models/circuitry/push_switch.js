class PushSwitch extends Gate {
  constructor(settings){
    super(settings);
    this.numInputs = 1;
    this.closed = this.settings.closed;
  }

  output(){
    if (this.closed){
      return this.inputs[0].output();
    } else {
      return 0;
    }
  }

  handleToggleStart(){ this._toggle(); }
  handleToggleEnd(){ this._toggle(); }

  _toggle(){
    this.closed = (this.closed + 1) % 2;
  }
}