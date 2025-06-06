class CellViewer {
  renderCell(tmpCell, tmpX, tmpY, cellWidth, cellHeight){
    if (tmpCell.needsRender == false) {
      return;
    }

    // Original coloring - results in muted grays
    // fill(255 * (1 - tmpCell.b));
    
    // From: https://editor.p5js.org/codingtrain/sketches/govdEW5aE
    //  results in more contrasting shades
    let shade = floor((tmpCell.a - tmpCell.b) * 255);
    shade = constrain(shade, 0, 255);
    fill(shade);

    rect(tmpX, tmpY, cellWidth, cellHeight);

    tmpCell.needsRender = false;
  }
}
