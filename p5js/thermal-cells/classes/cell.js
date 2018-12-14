class Cell {
  constructor () {
    this.temp = 0;
    this.deltaTemp = 0;
    this.condFactor = 0.10;
  }

  static get MAX_TEMP(){ return 300; }
  static get MIN_TEMP(){ return -300; }

  exchangeHeat(otherCell){
    if (this.isWall || otherCell.isWall){
      return true;
    }

    if (this.isSource) {
      this.temp = Math.min(this.temp + 100, Cell.MAX_TEMP);
    }
    if (this.isSink) {
      this.temp = Math.max(this.temp - 100, Cell.MIN_TEMP);
    }

    let heatGained = (otherCell.temp - this.temp) *  this.condFactor;
    this.deltaTemp += heatGained;
    otherCell.deltaTemp -= heatGained;
  }

  resolveHeatExchange(){
    this.temp += this.deltaTemp;
    this.deltaTemp = 0;
  }
}
