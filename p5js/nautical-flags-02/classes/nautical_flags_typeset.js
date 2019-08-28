class NauticalFlagsTypeset {
  constructor(){
    this.font = undefined;

    this.styleStack = [];
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

  getProperties(){
    return {
      fontWidth: this.fontWidth
    };
  }

  textSize(newSize){
    this.font.flagWidth = newSize;
  }

  push(){
    this.styleStack.push(this.getProperties());
  }

  pop(){
    if (this.styleStack.length == 0){
      return;
    }
    this.applyStyle( this.styleStack.pop() );
  }

  applyStyle(style){
    this.font.flagWidth = style.fontWidth;
  }

  text(str, x, y, w, h){
    x = x || 0;
    y = y || 0;
    w = w || width;
    h = h || height - y;
    let textAlignment = textAlign();

    const letterSpacing = this.fontWidth * 0.1;


    const textWidth = str.length * this.fontWidth 
                        + (str.length - 1) * letterSpacing;
    let startX;
    if (textAlignment.horizontal == CENTER){
      startX = x + (w - textWidth) / 2;
    } else if (textAlignment.horizontal == RIGHT){
      startX = x + w - textWidth;
    } else {
      // ALIGN LEFT
      startX = x;
    }

    noStroke();
    push();
    translate(startX, y);
    const symbols = str.split('');

    for(var i = 0; i < symbols.length; i++){
      let renderMethodName = this.renderMethodFor(symbols[i]);
      this.font[renderMethodName]();
      translate(this.fontWidth + letterSpacing, 0);
    }
    pop();
  }

  _renderVia(methodName){
    if (undefined === this.font[methodName]){
      console.warn('Unsupported render method: ' + methodName);
      return false;
    }
    return this._renderSingle(methodName);
  }

  _renderSingle(methodName){
    background(50);
    noStroke();
    push();
    translate(width / 2 - this.fontWidth / 2, height / 2 - this.fontWidth / 2);

    this.font[methodName]();
    pop();
    return true;
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
