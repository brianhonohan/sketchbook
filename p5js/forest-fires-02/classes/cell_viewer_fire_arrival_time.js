class CellViewerFireArrivalTime extends CellViewer {
  constructor (maxArrivalTime){
    super();
    this.maxArrivalTime = maxArrivalTime;
    this.minColor = color(180, 180, 0);
    this.maxColor = color(180, 0, 0);
    this.isPixelRenderer = false;
  }

  renderCell(tmpCell, tmpX, tmpY, cellWidth, cellHeight){
    this.renderCellViaRect(tmpCell, tmpX, tmpY, cellWidth, cellHeight);
  }

  renderCellViaRect(tmpCell, tmpX, tmpY, cellWidth, cellHeight){
    if (tmpCell.fireArrivalTime == undefined){
      super.renderCellViaRect(tmpCell, tmpX, tmpY, cellWidth, cellHeight);
      return;
    }
    let tmpColor = lerpColor(this.minColor, this.maxColor, tmpCell.fireArrivalTime / this.maxArrivalTime);
    fill( tmpColor );
    rect(tmpX, tmpY, cellWidth, cellHeight);
  }
}
