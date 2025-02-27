class Terrain extends DiscreteField {
  
  regenerate(){
    for(let i = 0; i < this.grid.numCells; i++){
      this.values[i] = this.getValueAt(Math.trunc(i / this.grid.numCols), i % this.grid.numCols);
    }
    this.refreshTiers();
  }
}