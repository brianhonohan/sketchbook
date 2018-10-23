class CellViewer {
  renderCell(tmpCell, tmpX, tmpY, cellWidth, cellHeight){
    fill(255 * (1 - tmpCell.b));
    rect(tmpX, tmpY, cellWidth, cellHeight);
  }
}
