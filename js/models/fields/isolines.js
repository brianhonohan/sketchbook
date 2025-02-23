class Isolines {
  constructor(field, settings){
    this.field = field;
    this.settings = settings;
  }

  refreshTiers(){
    this.tierStep = (this.field.range / this.settings.num_levels);
    this.tierBreakpoints = [];
    for (let i = 0; i < this.settings.num_levels; i++){
      this.tierBreakpoints[i] = this.tierStep * i; 
    }
  }
}