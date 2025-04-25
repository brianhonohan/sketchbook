class SlippyMap {
  constructor(p_xSizeAndPos, renderer){
    this.sizeAndPosition = p_xSizeAndPos;
    this.tileRenderer = renderer
    this.tileSize = this.tileRenderer.tileSize;
    this.tileSets = {};

    this.zoom = 0;
    this.targetZoom = 0;
    this.maxZoom = 5 + 0.999;

    this.zoomDiffThreshold = 0.05;

    this.startDragX = undefined;
    this.startDragY = undefined;
    this.offsetX = 0;
    this.offsetY = 0;
    this.prevOffsetX = 0;
    this.prevOffsetY = 0;

    this.uiIsDragging = false;
    this.uiNeedsRendering = true;

    this.finiteWorld = true;

    this.worldFocalX = this.tileRenderer.tileSize / 2;
    this.worldFocalY = this.tileRenderer.tileSize / 2;
    this.focusOnWorld();
  }

  get x() { return this.sizeAndPosition.x; }
  get y() { return this.sizeAndPosition.y; }
  get width() { return this.sizeAndPosition.width; }
  get height() { return this.sizeAndPosition.height; }

  containsXY(x,y){
    return this.sizeAndPosition.containsXY(x, y);
  }

  get zoom(){ return this._zoom; }
  set zoom(z) {
    let prevZoom = this._zoom;
    let deltaZoom = z - this._zoom;
    this._zoom = z;
    this.visualScale = 1 + this._zoom % 1;

    if (this.worldFocalX != undefined){
      let magicHalf = 2;
      let prevScreenWidth = this.screenWidthForWorldAtZoom(prevZoom);
      let newScreenWidth = this.screenWidthForWorldAtZoom(z);
      this.offsetX = this.offsetX - (newScreenWidth - prevScreenWidth) / magicHalf;
      this.offsetY =  this.offsetY - (newScreenWidth - prevScreenWidth) / magicHalf;

      const debugZoom = false;
      if (debugZoom){
        let worldExtentX = this.x + this.offsetX + newScreenWidth;
        let viewportExtentX = this.x + this.width;

        console.log('---');
        // console.log(`map width: ${this.width}`);
        console.log(`zoom: ${this.zoom}`);
        console.log(`offsetX: ${this.offsetX}`);
        console.log(`x + offset: ${this.x + this.offsetX}`);
        console.log(`prevScreenWidth : ${prevScreenWidth}`);
        console.log(`newScreenWidth : ${newScreenWidth}`);
        // console.log(`viewportExtentX: ${viewportExtentX}`);
        console.log(`diff offsetX ${this.offsetX}  vs worldExtentX->Width ${viewportExtentX - worldExtentX} `);

        background(50);

        strokeWeight(5);
        
        stroke(255, 255, 0);
        point(this.x, 10);
        
        stroke(255, 0, 255);
        point(this.x + this.offsetX, 30);
        
        stroke(0, 200, 255);
        point(worldExtentX, 10);
        
        stroke(255, 255, 0);
        point(viewportExtentX, 10);
      }

    }

    this.scaledWidth = this.width / this.visualScale;
    this.scaledHeight = this.height / this.visualScale;
    this.numScaledTilesWide = this.scaledWidth / this.tileSize;
    this.numScaledTilesHigh = this.scaledHeight / this.tileSize;

    this.tileSet = this.getTilesetForZoom(Math.floor(z));
  }


  adjustZoom(zoomDelta){
    this.targetZoom = constrain(this._zoom + zoomDelta, 0, this.maxZoom);
    this.uiNeedsRendering = true;
  }

  focusOnWorld(){
    this.offsetX = (this.width / 2) - (this.worldFocalX);
    this.offsetY = (this.height / 2) - (this.worldFocalY);
  }

  numberOfTilesForZoom(zoom){
    return Math.pow(2, Math.floor(zoom));
  }

  visualScaleForZoom(zoom){
    return 1 + zoom % 1;
  }

  screenWidthForWorldAtZoom(zoom){
    return this.tileRenderer.tileSize 
                * this.numberOfTilesForZoom(zoom) 
                * this.visualScaleForZoom(zoom);
  }

  handleMousePressed(x,y){
    if (!this.containsXY(x,y)){
      return false;
    }

    // check to see if a tile would want to handle the click

    // otherwise, start dragging
    this.uiIsDragging = true;
    this.startDragX = x;
    this.startDragY = y;
    this.prevOffsetX = this.offsetX;
    this.prevOffsetY = this.offsetY;
  }


  handleMouseWheel(event){
    if (false === this.containsXY(event.x, event.y)){
      return false;
    }
    // not sure why my browser is returning +/- 68 when scrolling with mouse wheel,
    // and values closer to +/- 1 when two-finger scrolling with track pad
    // related to browser zoom level; maybe some OS level settings.
    // 
    // FINDING: 
    // Mouse scroll wheel sends through a set scroll-speed (between 67 - 133 or more)
    // Trackpad sends through numerous events with values with abs values of 1-60
    // ... a avlaue of 60 is a strong 'flick' on my trackpack
    // ... most values are between 1-10 with sensitive scrolling
    let scrollWheelSpeed = 0.4;
    if (this.prevScrollTimestamp != undefined){
      let diff = event.timeStamp - this.prevScrollTimestamp;

      // THIS SPEEDS UP SCROLLING IF the user uses scroll wheel quickly
      // because we want to mimic a flick to scroll on the trackpad
      if (diff < 200){
        scrollWheelSpeed += (50 / diff) ;
      }
    }
    
    let zoomDelta = event.delta;
    if (Math.abs(zoomDelta) > 50) {
      zoomDelta = scrollWheelSpeed * Math.sign(event.delta);
    } else {
      zoomDelta *= 0.25;
    }

    this.adjustZoom(zoomDelta);
    this.prevScrollTimestamp = event.timeStamp;
    return true;
  }

  handleMouseReleased(x,y){
    this.uiIsDragging = false;
  }

  handleMouseDragged(x, y, prevX, prevY){
    this.offsetX = this.prevOffsetX + x - this.startDragX;
    this.offsetY = this.prevOffsetY + y - this.startDragY;
    this.uiNeedsRendering = true;
  }

  // called once per frame, so dual purpose tick() and draw()
  render(){
    if (this.uiNeedsRendering == false){
      return;
    }
    this.tickToUpdateZoom();
    
    push();
    translate(this.x, this.y);
    this.fillBackground();

    scale(this.visualScale);
    let colsToShow = this.colsToShow();
    let rowsToShow = this.rowsToShow();

    for(let i = colsToShow[0]; i < colsToShow[1]; i++){
      for(let j = rowsToShow[0]; j < rowsToShow[1]; j++){
        this.renderTile( this.tileSet.getTile(i,j) );
      }
    }

    pop();
    this.uiNeedsRendering = (this.zoomDiffThreshold < Math.abs(this._zoom - this.targetZoom));
  }

  tickToUpdateZoom(){
    let zoomDiffToTarget = Math.abs(this.targetZoom - this.zoom);
    if (zoomDiffToTarget < 0.00001 ) {
      // do nothing 
    } else if (zoomDiffToTarget < this.zoomDiffThreshold) { 
      this.zoom = this.targetZoom;
    } else {
      let newZoom = this._zoom + (this.targetZoom - this._zoom) / 5;
      // console.log(`zoom is: ${this.zoom}  ... target: ${this.targetZoom}   newZoom: ${newZoom}`)
      this.zoom = newZoom;  
    }
  }

  colsToShow(){
    let first = floor((0 - this.offsetX) / this.tileSize / this.visualScale);
    let last = first + this.numScaledTilesWide + 1; // TODO: remove hack to always get one more column

    if (this.finiteWorld) {
      first = constrain(first, 0, this.tileSet.colCount);
      last = constrain(last, 0, this.tileSet.colCount);
    }
    return [first, last];
  }

  rowsToShow(){
    let first = floor((0 - this.offsetY) / this.tileSize / this.visualScale);
    let last = first + this.numScaledTilesHigh + 1;

    if (this.finiteWorld) {
      first = constrain(first, 0, this.tileSet.rowCount);
      last = constrain(last, 0, this.tileSet.rowCount);
    }
    return [first, last];
  }

  renderTile(tile){
    let x = tile.x * this.tileSize + this.offsetX / this.visualScale;
    let y = tile.y * this.tileSize + this.offsetY / this.visualScale;

    if ((x + this.tileSize) < 0 || (y + this.tileSize) < 0){
      // this tile should not be rendered
      // console.log('x or y is negative; tile should not be shown');
      return;
    }

    let dWidth  = min(this.tileSize, this.scaledWidth - x);
    let dHeight = min(this.tileSize, this.scaledHeight - y);

    // TEMPORARILY bring back this safeguard
    if (dWidth <= 0 || dHeight <= 0){
      // this tile should not be rendered
      // console.log('x or y is > tileSize; tile should not be shown');
      return;
    }

    let sX = 0;
    let sY = 0;
    if (x < 0) { 
      sX = -1 * x;
      dWidth = min(this.tileSize - sX, this.scaledWidth);
      x = 0;
    }
    if (y < 0) { 
      sY = -1 * y;
      dHeight = min(this.tileSize - sY, this.scaledHeight);
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
