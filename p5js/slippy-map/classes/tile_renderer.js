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
    let r = 30;
    let b = 50 + 180 * ((x + y) % 2);
    let g = 180 * ((1 + x + y) % 2) + 20 * ((x + y) % 2);

    graphics.noStroke();
    graphics.fill(r, g, b);
    graphics.rect(0,0, this.tileSize, this.tileSize);

    graphics.textAlign(CENTER, CENTER);
    graphics.fill(0);
    graphics.textSize(this.tileSize / 4);
    graphics.text(`${x},${y},${zoom}`, this.tileSize / 2, this.tileSize / 2);
  }
}
