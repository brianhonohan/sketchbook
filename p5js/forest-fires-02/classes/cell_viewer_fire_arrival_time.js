class CellViewerFireArrivalTime {
  constructor (maxArrivalTime){
    this.maxArrivalTime = maxArrivalTime;
    this.minColor = color(180, 180, 0);
    this.maxColor = color(180, 0, 0);
    this.isPixelRenderer = false;
  }

  renderCell(tmpCell, tmpX, tmpY, cellWidth, cellHeight){
    this.renderCellViaRect(tmpCell, tmpX, tmpY, cellWidth, cellHeight);
  }

  renderCellViaRect(tmpCell, tmpX, tmpY, cellWidth, cellHeight){
    let tmpColor = lerpColor(this.minColor, this.maxColor, tmpCell.fireArrivalTime / this.maxArrivalTime);
    fill( tmpColor );
    rect(tmpX, tmpY, cellWidth, cellHeight);
  }
}
