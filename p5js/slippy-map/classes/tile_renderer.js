class TileRenderer {
  constructor(){
    this.tileSize = 256;
  }

  renderTile(x, y, zoom) {
    const tileImage = createGraphics(this.tileSize, this.tileSize);
    this.renderSimpleTileLabel(x,y,zoom,tileImage);
    return new Tile(x, y, zoom, tileImage);
  }

  renderSimpleTileLabel(x, y, zoom, graphics){
    graphics.noStroke();
    graphics.fill( this.colorFor(x, y, zoom));
    graphics.rect(0,0, this.tileSize, this.tileSize);

    graphics.textAlign(CENTER, CENTER);
    graphics.fill(0);
    graphics.textSize(this.tileSize / 4);
    graphics.text(`${x},${y},${zoom}`, this.tileSize / 2, this.tileSize / 2);
  }

  colorFor(x, y, zoom){
    let twoToZMin1 = Math.pow(2, zoom - 1);

    let xAdj = Math.floor(x / twoToZMin1);
    let yAdj = Math.floor(y / twoToZMin1);
    let xySum = xAdj + yAdj;

    let r = 10 + 170 * ((x + y) % 2);
    let b = 50 + 180 * ((xySum) % 2);
    let g = 180 * ((1 + xySum) % 2) + 20 * ((xySum) % 2);
    return color(r, g, b);
  }
}
