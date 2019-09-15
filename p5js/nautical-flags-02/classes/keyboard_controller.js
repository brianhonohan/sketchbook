class KeyboardController {
  constructor(){
    this.mode = KeyboardController.MODE_NORMAL;
    this.keyBuffer = [];
    this.typeset = undefined;
  }

  static get MODE_NORMAL(){ return 0; }
  static get MODE_CTRL_INPUT(){ return 1; }

  handleKeyPressed(){
    if (keyCode === CONTROL){
      this.mode = KeyboardController.MODE_CTRL_INPUT;
      return true;
    }

    let successfulRender;
    if (this.mode == KeyboardController.MODE_CTRL_INPUT){
      this.keyBuffer.push(key);
      successfulRender = this.typeset.renderBuffer(this.keyBuffer);

      if (successfulRender){
        this.clearKeyBuffer();
      }
    } else {
      if (key == 'Backspace'){
        this.typeset.backspace();
        return true;
      } else if (key == 'Escape'){
        this.typeset.clearPrintBuffer();
        return true;
      }

      successfulRender = this.typeset.renderKey(key);
    }

    if (successfulRender != true){
      if (this.mode == KeyboardController.MODE_NORMAL){
        console.warn('Unsupported flag requested: ' + key);
      }
      return false;
    }
    return true;
  }

  handleKeyReleased(){
    if (keyCode === CONTROL){
      this.mode = KeyboardController.MODE_NORMAL;
      this.clearKeyBuffer();
    }
  }

  resolveKeyBuffer(){
    if (this.keyBuffer.length < 2){
      return;
    }
    const flagCode = this.keyBuffer.join('').toUpperCase();
    const methodName = 'drawSpecial' + flagCode;
    this._renderVia(methodName);
    this.clearKeyBuffer();
  }

  clearKeyBuffer(){ this.keyBuffer.length = 0; }
}
