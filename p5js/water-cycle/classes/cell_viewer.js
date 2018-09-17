class CellViewer {
  constructor(){
    console.log("New cell viewer created");
  }

  renderCell(cell, x, y, p_nWidth, p_nHeight){
    noStroke();

    if (cell.air) {
      fill(system.terrain._colors.sky);
    } else if (cell.water) {
      fill(system.terrain._colors.water);
    } else if (cell.soil) {
      fill(system.terrain._colors.soil);
    } else {
      fill(0);
    }
    rect(x, y, p_nWidth, p_nHeight);
  }
}