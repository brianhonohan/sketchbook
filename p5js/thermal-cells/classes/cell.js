class Cell {
  constructor () {
    this.temp = 0;
    this.deltaTemp = 0;
    this.condFactor = 0.10;
    this.mode = Cell.MODE_AIR;
  }

  static get MODE_AIR(){      return 0; }
  static get MODE_WALL(){     return 1; }
  static get MODE_SINK(){     return 2; }
  static get MODE_SOURCE(){   return 3; }

  static get MAX_TEMP(){ return 300; }
  static get MIN_TEMP(){ return -300; }

  exchangeHeat(otherCell){
    switch(this.mode) {
      case Cell.MODE_WALL:
        return;
      case Cell.MODE_SINK:
        this.temp = Math.max(this.temp - 100, Cell.MIN_TEMP);
        break;
      case Cell.MODE_SOURCE:
        this.temp = Math.min(this.temp + 100, Cell.MAX_TEMP);
        break;
    }

    if (otherCell.mode == Cell.MODE_WALL){
      return true;
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
