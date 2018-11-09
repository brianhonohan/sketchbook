class SeasonalTime {
  constructor(yearsPerTick){
    this.years = 0;
    this.yearsPerTick = yearsPerTick;
    this.season = SeasonalTime.SPRING;
  }

  tick(){
    this.years += this.yearsPerTick;
    this.season = Math.floor(this.years % 1 / 0.25);
  }

  static get SPRING(){ return 0; }
  static get SUMMER(){ return 1; }
  static get FALL(){   return 2; }
  static get WINTER(){ return 3; }

  get year(){
    return Math.floor(this.years);
  }
}