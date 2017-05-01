class Cell {
  constructor () {
    this.temp = 0;
    this.deltaTemp = 0;
    this.condFactor = 0.10;
  }

  exchangeHeat(otherCell){
    let heatGained = (otherCell.temp - this.temp) *  this.condFactor;
    this.deltaTemp += heatGained;
    otherCell.deltaTemp -= heatGained;
  }

  resolveHeatExchange(){
    this.temp += this.deltaTemp;
    this.deltaTemp = 0;
  }
}
