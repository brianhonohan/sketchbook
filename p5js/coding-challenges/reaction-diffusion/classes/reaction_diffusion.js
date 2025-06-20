class ReactionDiffusion {
  constructor(){
    this.optionsSet = new OptionsSet(this.optionsMetadata());
    this.settings = {};
    this.resetDefaults();
  }

  resetDefaults(){
    for (let key in this.optionsSet.settings) {
      this.settings[key] = this.optionsSet.settings[key];
    }
  }

  get dA() { return this.settings.diffRateA; }
  get dB() { return this.settings.diffRateB; }
  get killRate() { return this.settings.killRate; }
  get feedRate() { return this.settings.feedRate; }
  get dt() { return this.settings.dt; }

  calcReaction(cell, neighbors){
    cell.nextA = this.calcNextA(cell, neighbors);
    cell.nextB = this.calcNextB(cell, neighbors);
  }

  calcNextA(cell, neighbors){
    return cell.a + (this.dA * this.laplaceA(cell, neighbors) 
                    - (cell.a * cell.b * cell.b)
                    + this.feedRate * ( 1 - cell.a)) * this.dt;
  }

  calcNextB(cell, neighbors){
    return cell.b + (this.dB * this.laplaceB(cell, neighbors) 
                    + (cell.a * cell.b * cell.b)
                    - (this.killRate + this.feedRate) * cell.b) * this.dt;
  }

  laplaceA(cell, neighbors){
    let weights = this.laplaceWeights();
    return neighbors.map((el, i) => el.a * weights[i])
                    .reduce((sum, el) => sum + el)
                    - cell.a;
  }

  laplaceB(cell, neighbors){
    let weights = this.laplaceWeights();
    return neighbors.map((el, i) => el.b * weights[i])
                    .reduce((sum, el) => sum + el)
                    - cell.b;
  }

  laplaceWeights(){
    return [
        0.05,
        0.2,
        0.05,

        0.2,
        // middle, self
        0.2,

        0.05,
        0.2,
        0.05,
      ];
  }

  optionsMetadata(){
    return [
      { name: "diffRateA", type: "float", default: 1.0}, 
      { name: "diffRateB", type: "float", default: 0.5}, 
      { name: "killRate", type: "float", default: 0.062}, 
      { name: "feedRate", type: "float", default: 0.055}, 
      { name: "dt", type: "float", default: 0.9},
    ];
  }
}
