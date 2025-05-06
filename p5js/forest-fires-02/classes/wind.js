class WindField {
  constructor(sizeAndPosition){
    this.sizeAndPosition = sizeAndPosition;
    this.windNoiseScale = 0.00000003;
  }

  get width() { return this.sizeAndPosition.width; }
  get height() { return this.sizeAndPosition.height; }

  setCellWidth(size){
    this.cellWidth = size;
    this.initCells();
  }

  initCells(){
    this.numCols = Math.ceil(this.width / this.cellWidth);
    this.numRows = Math.ceil(this.height / this.cellWidth);

    this.cells = [];
    for(let i = 0; i < this.numCols; i++){
      for(let j = 0; j < this.numRows; j++){ 
        this.cells[i + j * this.numCols] = this.modelWindAtColRow(i, j);
      }
    }
  }

  modelWindAtColRow(col, row){
    let noiseAtPoint = noise(this.windNoiseScale * col, this.windNoiseScale * row);
    
    let angleFromNoise = noiseAtPoint * TWO_PI * 4;
  
    let magOffset = 10000;
    let magFromNoise = noise(this.windNoiseScale * col + magOffset, this.windNoiseScale * row + magOffset);
    
    let tmpVector = p5.Vector.fromAngle(angleFromNoise, magFromNoise)
    return tmpVector;
  }

  indexForXY(x, y){
    let col = Math.floor( x / this.cellWidth );
    let row = Math.floor( y / this.cellWidth );
    return col + row * this.numCols;
  }

  fetchWindAtXY(x, y){
    return this.cells[this.indexForXY(x, y)];
  }
}