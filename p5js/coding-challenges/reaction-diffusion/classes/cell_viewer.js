class CellViewer {
  renderCell(tmpCell, tmpX, tmpY, cellWidth, cellHeight){
    fill(255 * (1 - tmpCell.b));
    if (tmpCell.needsRender == false) {
      return;
    }
    rect(tmpX, tmpY, cellWidth, cellHeight);

    tmpCell.needsRender = false;
  }
}
