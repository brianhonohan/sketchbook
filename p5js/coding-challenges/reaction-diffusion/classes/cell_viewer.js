class CellViewer {
  renderCell(tmpCell, tmpX, tmpY, cellWidth, cellHeight){
    let c = color(50 + tmpCell.a * 200, 50, 50 + tmpCell.b * 200);
    fill(c);
    rect(tmpX, tmpY, cellWidth, cellHeight);
  }
}
