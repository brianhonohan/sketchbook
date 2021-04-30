class TileSet {
  constructor(zoom, tileRenderer){
    this.zoom = zoom;
    this.tileRenderer = tileRenderer;
    this.tiles = {};

    this.rowCount = TileSet.rowCount(this.zoom);
    this.colCount = TileSet.colCount(this.zoom);
  }

  static rowCount(zoomLevel) { return Math.pow(2, zoomLevel); }
  static colCount(zoomLevel) { return TileSet.rowCount(zoomLevel); }

  getTile(x, y){
    const tileIdx = `${x}/${y}`;
    let tile = this.tiles[tileIdx];
    if (tile){
      return tile;
    }
    this.tiles[tileIdx] = this.tileRenderer.renderTile(x, y, this.zoom);
    return this.tiles[tileIdx];
  }
}