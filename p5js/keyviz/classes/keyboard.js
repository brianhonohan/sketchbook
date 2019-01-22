class Keyboard{
  constructor(p_xSizeAndPos){
    this.sizeAndPosition = p_xSizeAndPos;
    this.margin = 2;
    this.colorId = P5JsUtils.COLOR_ID_GREEN;

    // Set up calculated values
    this.keyWidth = 0;
    this.keyHeight = 0;
    this.keycodeToRow = [];
    this.keycodeToCol = [];
    this.rowToMargin = [];

    this.initStaticProperties();
    this.initDerivedProperties();
  }

  get x() { return this.sizeAndPosition.x; }
  get y() { return this.sizeAndPosition.y; }
  get width() { return this.sizeAndPosition.width; }
  get height() { return this.sizeAndPosition.height; }

  initStaticProperties(){
    this.populateKeycodeTable("~!@#$%^&*()_+", 0, 0);
    this.populateKeycodeTable("`1234567890-=", 0, 0);
    this.populateKeycodeTable("qwertyuiop[]\\", 1, 0);
    this.populateKeycodeTable("QWERTYUIOP{}|", 1, 0);
    this.populateKeycodeTable("asdfghjkl;'", 2, 0);
    this.populateKeycodeTable("ASDFGHJKL:\"", 2, 0);
    this.populateKeycodeTable("ASDFGHJKL:\"", 2, 0);
    this.populateKeycodeTable("zxcvbnm,./", 3, 0);
    this.populateKeycodeTable("ZXCVBNM<>?", 3, 0);
    this.populateKeycodeTable(" ", 4, 0);
  }
  
  populateKeycodeTable(keys, row, colOffset){
    for(let i = 0; i < keys.length; i++){
      let c = keys.charCodeAt(i);
      this.keycodeToRow[c] = row;
      this.keycodeToCol[c] = colOffset + i;
    }
  }
  
  initDerivedProperties(){
    const numRows = 5;
    const numCols = 14; // backtick to += key ... and delete key
    this.keyWidth = (this.width - this.margin*(numCols+1))/ (1.0 * numCols);
    this.keyHeight = (this.height - this.margin*(numRows+2))/ (1.0 * numRows); 
    
    this.rowToMargin = [];
    this.rowToMargin[0] = 0;
    this.rowToMargin[1] = this.margin + (this.keyWidth + this.margin) * 1.5;
    this.rowToMargin[2] = this.margin + (this.keyWidth + this.margin) * 1.7;
    this.rowToMargin[3] = this.margin + (this.keyWidth + this.margin) * 2;
    this.rowToMargin[4] = this.margin + (this.keyWidth + this.margin) * 4;
  }

  getPointForKey(keycode){
    if (keycode < 0 || keycode > (this.keycodeToRow.length-1)){
       console.log("INVALID KEYCODE" +  keycode);
       return createVector(-1000,-1000);
    }
    
    const row = this.keycodeToRow[keycode];
    const col = this.keycodeToCol[keycode];
    const xPos = this.rowToMargin[row] + this.margin*col + col*this.keyWidth + 0.5*this.keyWidth;
    const yPos = this.margin*row + row*this.keyHeight + 0.5*this.keyHeight;
    return createVector(xPos, yPos);
  }

  keyWidthForCode(keyCode){
    return (keyCode == 32) ? (5 * this.keyWidth + 4 * this.margin) : this.keyWidth;
  }
  
  showPressedKey(keyCode){
    push();
    translate(this.x, this.y);
    const pt = this.getPointForKey(keyCode);
    fill( P5JsUtils.getRandomColorByID(this.colorId) );
    rect(pt.x, pt.y, this.keyWidthForCode(keyCode), this.keyHeight );
    pop();
  }
}
