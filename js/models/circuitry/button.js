class Button extends Input {
  constructor(settings){
    super(settings);
    this.signal = this.settings.signal;
  }

  output(){
    return this.signal;
  }

  handleUserToggle(){
    this.signal = (this.signal + 1) % 2;
  }
}
