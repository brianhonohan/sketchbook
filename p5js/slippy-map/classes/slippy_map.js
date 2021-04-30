class SlippyMap {
  constructor(p_xSizeAndPos, renderer){
    this.sizeAndPosition = p_xSizeAndPos;
    this.tileRenderer = renderer
    this.tileSets = {};

    this.zoom = 0;
    this.maxZoom = 5;

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
    this.tileSet = this.getTilesetForZoom(Math.floor(z));
  }

  adjustZoom(zoomDelta){
    this.zoom = constrain(this._zoom + zoomDelta, 0, this.maxZoom);
    this.uiNeedsRendering = true;
  }

  render(){
    if (this.uiNeedsRendering == false){
      return;
    }
    push();
    translate(this.x, this.y);
    this.fillBackground();

    for(let i = 0; i < this.tileSet.colCount; i++){
      for(let j = 0; j < this.tileSet.rowCount; j++){
        this.renderTile( this.tileSet.getTile(i,j) );
      }
    }

    pop();

    this.uiNeedsRendering = false;
  }

  renderTile(tile){
    image(tile.image, tile.x * this.tileRenderer.tileSize, tile.y * this.tileRenderer.tileSize);
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
