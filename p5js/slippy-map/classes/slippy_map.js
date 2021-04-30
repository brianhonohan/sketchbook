class SlippyMap {
  constructor(p_xSizeAndPos, renderer){
    this.sizeAndPosition = p_xSizeAndPos;
    this.tileRenderer = renderer
    this.tileSize = this.tileRenderer.tileSize;
    this.tileSets = {};

    this.zoom = 0;
    this.maxZoom = 5 + 0.999;

    this.offsetX = 0;
    this.offsetY = 0;

    this.uiIsDragging = false;
    this.uiNeedsRendering = true;
  }

  get x() { return this.sizeAndPosition.x; }
  get y() { return this.sizeAndPosition.y; }
  get width() { return this.sizeAndPosition.width; }
  get height() { return this.sizeAndPosition.height; }

  containsXY(x,y){
    return this.sizeAndPosition.containsXY(x, y);
  }

  set zoom(z) {
    this._zoom = z;
    this.visualScale = 1 + this._zoom % 1;
    this.scaledWidth = this.width / this.visualScale;
    this.scaledHeight = this.height / this.visualScale;

    this.numScaledTilesWide = this.scaledWidth / this.tileSize;
    this.numScaledTilesHigh = this.scaledHeight / this.tileSize;

    this.tileSet = this.getTilesetForZoom(Math.floor(z));
  }

  adjustZoom(zoomDelta){
    this.zoom = constrain(this._zoom + zoomDelta, 0, this.maxZoom);
    this.uiNeedsRendering = true;
  }

  handleMousePressed(x,y){
    if (!this.containsXY(x,y)){
      return false;
    }

    // check to see if a tile would want to handle the click

    // otherwise, start dragging
    this.uiIsDragging = true;
  }

  handleMouseReleased(x,y){
    this.uiIsDragging = false;
  }

  handleMouseDragged(x, y, prevX, prevY){
    const deltaX = x - prevX;
    const deltaY = y - prevY;
    // console.log(`Dragged:  x: ${deltaX} ... y: ${deltaY}`);

    this.offsetX += deltaX;
    this.offsetY += deltaY;
    this.uiNeedsRendering = true;
  }

  render(){
    if (this.uiNeedsRendering == false){
      return;
    }
    push();
    translate(this.x, this.y);
    this.fillBackground();

    scale(this.visualScale);
    let numColsToShow = min(this.numScaledTilesWide, this.tileSet.colCount);
    let numRowsToShow = min(this.numScaledTilesHigh, this.tileSet.rowCount);

    for(let i = 0; i < numColsToShow; i++){
      for(let j = 0; j < numRowsToShow; j++){
        this.renderTile( this.tileSet.getTile(i,j) );
      }
    }

    pop();
    this.uiNeedsRendering = false;
  }

  renderTile(tile){
    let x = tile.x * this.tileSize + this.offsetX / this.visualScale;
    let y = tile.y * this.tileSize + this.offsetY / this.visualScale;

    if ((x + this.tileSize) < 0 || (y + this.tileSize) < 0){
      // this tile should not be rendered
      console.log('x or y is negative; tile should not be shown');
      return;
    }

    let dWidth  = min(this.tileSize, this.scaledWidth - x);
    let dHeight = min(this.tileSize, this.scaledHeight - y);

    // TEMPORARILY bring back this safeguard
    if (dWidth <= 0 || dHeight <= 0){
      // this tile should not be rendered
      console.log('x or y is > tileSize; tile should not be shown');
      return;
    }

    let sX = 0;
    let sY = 0;
    if (x < 0) { 
      sX = -1 * x;
      dWidth = this.tileSize - sX;
      x = 0;
    }
    if (y < 0) { 
      sY = -1 * y;
      dHeight = this.tileSize - sY;
      y = 0;
    }

    image(tile.image, x, y, dWidth, dHeight, sX, sY, dWidth, dHeight);
  }

  fillBackground(){
    noStroke();
    fill(255);
    rect(0, 0, this.width, this.height);
  }

  getTilesetForZoom(zoom){
    const zoomIdx = "" + zoom;
    if (this.tileSets[zoomIdx]) {
      return this.tileSets[zoomIdx];
    }
    this.tileSets[zoomIdx] = new TileSet(zoom, this.tileRenderer);
    return this.tileSets[zoomIdx];
  }
}
