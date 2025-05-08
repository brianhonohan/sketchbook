class Resources {
  constructor(){
    this.initResources();
    this.initReplenishRates();
  }

  static get RES_FIRE_BREAK(){ return 0; }
  static get RES_KNOCK_DOWN(){ return 1; }

  get fire_break(){ return this.resources[Resources.RES_FIRE_BREAK]; }
  get knock_down(){ return this.resources[Resources.RES_KNOCK_DOWN]; }

  initResources(){
    this.resources = [];
    this.resources[Resources.RES_FIRE_BREAK] = 40;
    this.resources[Resources.RES_KNOCK_DOWN] = 10;
  }

  initReplenishRates(){
    this.rates = [];
    this.rates[Resources.RES_FIRE_BREAK] = 0.05;
    this.rates[Resources.RES_KNOCK_DOWN] = 0.025;
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
