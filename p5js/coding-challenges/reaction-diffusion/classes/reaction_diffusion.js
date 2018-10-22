class ReactionDiffusion {
  constructor(){
    this.optionsSet = new OptionsSet(this.optionsMetadata());
    this.settings = this.optionsSet.settings;
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
    return cell.a + (this.dA * this.laplaceA(neighbors) 
                    - Math.pow(cell.a * cell.b, 2)
                    + this.feedRate * ( 1 - cell.a)) * this.dt;
  }

  calcNextB(cell, neighbors){
    return cell.b + (this.dB * this.laplaceB(neighbors) 
                    + Math.pow(cell.a * cell.b, 2)
                    - (this.killRate + this.feedRate) * cell.b) * this.dt;
  }

  laplaceA(neighbors){
    let weights = this.laplaceWeights();
    return neighbors.map((el, i) => el.a * weights[i])
                    .reduce((sum, el) => sum + el);
  }

  laplaceB(neighbors){
    let weights = this.laplaceWeights();
    return neighbors.map((el, i) => el.a * weights[i])
                    .reduce((sum, el) => sum + el);
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
      { name: "diffRateA", type: "integer", default: 1}, 
      { name: "diffRateB", type: "integer", default: 1}, 
      { name: "killRate", type: "integer", default: 0.2}, 
      { name: "feedRate", type: "float", default: 0.5}, 
      { name: "dt", type: "float", default: 0.05},
    ];
  }
}
