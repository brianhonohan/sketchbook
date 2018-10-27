class SeasonalTime {
  constructor(yearsPerTick){
    this.years = 0;
    this.yearsPerTick = yearsPerTick;
  }

  tick(){
    this.years += this.yearsPerTick;
  }

  static get SPRING(){ return 0; }
  static get SUMMER(){ return 1; }
  static get FALL(){   return 2; }
  static get WINTER(){ return 3; }

  get year(){
    return Math.floor(this.years);
  }

  // Only makes sense when yearsPerTick is less than 1
  get season(){
    let yearOffset = this.years % 1;

    if (yearOffset < 0.25){
      return SeasonalTime.SPRING;
    } else if (yearOffset < 0.5){
      return SeasonalTime.SUMMER;
    } else if (yearOffset < 0.75){
      return SeasonalTime.FALL;
    } else {
      return SeasonalTime.WINTER;
    }
  }
}