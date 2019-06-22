class Resources {
  constructor(){
    this.initResources();
    this.initReplenishRates();
  }

  static get RES_FIRE_BREAK(){ return 0; }

  get fire_break(){ return this.resources[Resources.RES_FIRE_BREAK]; }

  initResources(){
    this.resources = [];
    this.resources[Resources.RES_FIRE_BREAK] = 10;
  }

  initReplenishRates(){
    this.rates = [];
    this.rates[Resources.RES_FIRE_BREAK] = 0.025;
  }

  has(resource){
    return this.resources[resource] > 1;
  }

  use(resource){
     this.resources[resource] -= 1;
  }

  tick(){
    this.replenishResources();
  }

  replenishResources(){
    this.resources.forEach((_, idx) => {
      this.resources[idx] += this.rates[idx];
    });
  }
}
