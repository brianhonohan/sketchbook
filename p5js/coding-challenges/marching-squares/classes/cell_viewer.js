class CellViewer {
  renderCell(tmpCell, tmpX, tmpY, cellWidth, cellHeight){
    stroke(50, 200, 200);

    if (tmpCell.system.settings.drawGrid){
      fill(50);
      rect(tmpX, tmpY, cellWidth, cellHeight);
    }
    
    noFill();
    text("" + tmpCell.value, tmpX + cellWidth / 2, tmpY + cellHeight/2);
  }
}
