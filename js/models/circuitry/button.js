class Button extends Input {
  constructor(settings){
    super(settings);
    this.signal = this.settings.signal;
  }

  output(){
    return this.signal;
  }

  handleToggleStart(){ this._toggle(); }
  handleToggleEnd(){ this._toggle(); }

  _toggle(){
    this.signal = (this.signal + 1) % 2;
  }
}
