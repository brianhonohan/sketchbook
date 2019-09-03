class NauticalFlagsTypeset {
  constructor(){
    this.font = undefined;

    this.styleStack = [];
    this.printBlocks = [];
    this.commandKeys = [];
    this.initCommandKeys();
    this.offset = createVector(0, 0);

    this.mode = NauticalFlagsTypeset.MODE_TEXT;
  }
  static get MODE_SINGLE(){ return 0; }
  static get MODE_TEXT(){ return 1; }

  static get CMD_KEY_ENTER() { return 'CMD_KEY_ENTER'; }

  initCommandKeys(){
    this.commandKeys.push(NauticalFlagsTypeset.CMD_KEY_ENTER);
  }

  setFont(newFont) {
    this.font = newFont;
    this.supportedKeybuffers = Object.getOwnPropertyNames(nauticalFlags.__proto__)
                                     .filter(item => typeof nauticalFlags[item] === 'function')
                                     .filter(name => name.startsWith('drawSpecial') )
                                     .map(name => name.replace('drawSpecial', ''));
  }

  getPrintBlocksInBase64(){
    return btoa(this.printBlocks.join('|'));
  }

  setPrintBlocksFromBase64(str){
    this.printBlocks = atob(str).split('|');
    this.mode = NauticalFlagsTypeset.MODE_TEXT;
    this._renderPrintBlocks();
  }

  requestFullRedraw(){
    this._renderPrintBlocks();
  }

  get fontWidth(){
    return this.font.size;
  }

  getProperties(){
    return {
      fontWidth: this.fontWidth
    };
  }

  textSize(newSize){
    this.font.size = newSize;
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
    this.font.size = style.fontWidth;
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

  backspace(){
    this.printBlocks.pop();
    if (this.mode == NauticalFlagsTypeset.MODE_TEXT){
      this._renderPrintBlocks();
    }
  }

  clearPrintBuffer(){
    this.printBlocks = [];
    if (this.mode == NauticalFlagsTypeset.MODE_TEXT){
      this._renderPrintBlocks();
    }
  }

  _renderVia(methodName){
    let isKnownMethod = !(undefined === this.font[methodName]);
    let isCommandKey = this.commandKeys.includes(methodName);

    if (this.mode == NauticalFlagsTypeset.MODE_TEXT 
          && (isKnownMethod || isCommandKey))
    {
      this.printBlocks.push(methodName);
      return this._renderPrintBlocks();
    } else if (this.mode == NauticalFlagsTypeset.MODE_SINGLE && isKnownMethod){
      return this._renderSingle(methodName);
    } else {
      // console.warn('Unsupported render method: ' + methodName);
      return false;
    }
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

  shiftOffset(xDelta, yDelta){
    const minScrollY = this.totalY * -1 + 1.1 * this.fontWidth;
    this.offset.y = constrain(this.offset.y + yDelta, minScrollY, 0);
  }

  _renderPrintBlocks(){
    this.pos = createVector(20 + this.offset.x, 50 + this.offset.y);
    let startY = this.pos.y;
    noStroke();
    background(50);
    push();
    translate(this.pos.x, this.pos.y);

    let letterSpacing = 0.1 * this.fontWidth;
    let blockOffset = this.fontWidth + letterSpacing;
    let startX = this.pos.x;

    for(var i = 0; i < this.printBlocks.length; i++){
      let renderMethodName = this.printBlocks[i];

      if (renderMethodName == NauticalFlagsTypeset.CMD_KEY_ENTER){
        translate(startX - this.pos.x, blockOffset);
        this.pos.x = startX;
        this.pos.y += blockOffset;
        continue;
      }
      this.font[renderMethodName]();

      if ((this.pos.x + blockOffset + this.fontWidth) > width){
        translate(startX - this.pos.x, blockOffset);
        this.pos.x = startX;
        this.pos.y += blockOffset;
      } else {
        this.pos.x += blockOffset;
        translate(blockOffset, 0);
        // translate(this.fontWidth + letterSpacing, 0);
      } 
    }
    pop();
    this.totalY = this.pos.y - startY;
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

    if (this.mode == NauticalFlagsTypeset.MODE_TEXT){
      if (key == 'Enter'){
        return NauticalFlagsTypeset.CMD_KEY_ENTER;
      }
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
