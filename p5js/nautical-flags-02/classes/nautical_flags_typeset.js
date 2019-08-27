class NauticalFlagsTypeset {
  constructor(){
    this.font = undefined;
  }

  setFont(newFont) {
    this.font = newFont;
    this.supportedKeybuffers = Object.getOwnPropertyNames(nauticalFlags.__proto__)
                                     .filter(item => typeof nauticalFlags[item] === 'function')
                                     .filter(name => name.startsWith('drawSpecial') )
                                     .map(name => name.replace('drawSpecial', ''));
  }

  get fontWidth(){
    return this.font.flagWidth;
  }

  setTempWidth(newWidth){ 
    this.oldWidth = this.font.flagWidth;
    this.font.flagWidth = newWidth;
  }
  restoreOldWidth(){
    this.font.flagWidth = this.oldWidth;
  }

  text(str, x, y){
    const margin = 0.1 * width;
    const displayWidth = width - 2 * margin;

    const letterWidth = displayWidth / str.length;

    this.setTempWidth(0.9 * letterWidth);
    const letterSpacing = letterWidth - this.flagWidth;

    noStroke();
    push();
    x = x || margin;
    y = y || height / 2 - this.flagWidth / 2;
    translate(x, y);
    const symbols = str.split('');

    for(var i = 0; i < symbols.length; i++){
      let renderMethodName = this.renderMethodFor(symbols[i]);
      this[renderMethodName]();
      translate(this.flagWidth + letterSpacing, 0);
    }
    pop();
    this.restoreOldWidth();
  }

  _renderVia(methodName){
    if (undefined === this.font[methodName]){
      console.warn('Unsupported render method: ' + methodName);
      return false;
    }
    background(50);
    noStroke();
    push();
    translate(width / 2 - this.fontWidth / 2, height / 2 - this.fontWidth / 2);

    this.font[methodName]();
    pop();
    return true
  }

  renderKey(){
    return this._renderVia( this.renderMethodFor(key) );
  }

  renderBuffer(keybuffer){
    return this._renderVia( this.renderMethodForBuffer(keybuffer) );
  }

  pennantNumberFromKey(key){
    return ')!@#$%^&*('.indexOf(key);
  }

  renderMethodFor(key){
    const supportedFlags = /^[a-z0-9]$/i;
    if (supportedFlags.test(key)) {
      return 'draw' + key.toUpperCase();
    }

    let pennantNumber = this.pennantNumberFromKey(key);
    if (pennantNumber >= 0){
      return 'drawNato' + pennantNumber; 
    }

    if (key == ' '){
      return 'drawSpace';
    }

    if (key == '.'){
      return 'drawCodeFlag';
    }
    return undefined;
  }

  renderMethodForBuffer(keybuffer){
    if (keybuffer.length == 1 && keybuffer[0] >= '1' && keybuffer[0] <= '4'){
      return 'drawSubstitute' + key;
    } else {
      let flagCode = keybuffer.join('').toUpperCase();
      if (this.supportedKeybuffers.includes(flagCode)){
        return 'drawSpecial' + flagCode;
      }
    }
  }
}
