class Forest {
  constructor(area, system){
    this.area = area;
    this.ecosystem = system;
    this.trees = [];
    this.treeCounter = 0;
    this.sproutTree(this.centerX, this.centerY);

    this.prevSeason = undefined;
  }

  get centerX() { return this.area.centerX; }
  get centerY() { return this.area.centerY; }

  sproutTree(x, y){
    this.trees.push( new Tree(x, y, 0, this.treeCounter++) );
  }

  tick(){
    this.trees.forEach(t => t.tick());
    this.lossDueToMaxAge();
    this.lossDueToForaging();
    this.triggerSeasonalBehavior();
  }

  lossDueToMaxAge(){
    this.trees = this.trees.filter(t => t.age < Tree.MAX_AGE);
  }

  lossDueToForaging(){
    const durationSusceptibleToForaging = 10;
    const durationInTicks = durationSusceptibleToForaging / System.YEARS_PER_TICK;
    const pOfDeathDueToForaging = 0.9; // function of herbivores in area
    const pOfSurvivalDespiteForaging = 1 - pOfDeathDueToForaging;
    const pSurvivalInGivenTick = Math.pow(pOfSurvivalDespiteForaging, 1 / durationInTicks);

    this.trees = this.trees.filter(t => {
      let treeIsOldEnough = t.age > durationSusceptibleToForaging;
      let treeAvoidedForaging = (Math.random() < pSurvivalInGivenTick);
      return treeIsOldEnough || treeAvoidedForaging;
    });
  }

  triggerSeasonalBehavior(){
    let currentSeason = this.ecosystem.seasonalTime.season;
    if (currentSeason == SeasonalTime.SPRING){
      if(this.prevSeason == SeasonalTime.WINTER){
        this.tickStartOfSpringBehavior();
      }
    }

    this.prevSeason = currentSeason;
  }

  tickStartOfSpringBehavior(){
    this.trees.filter(t => t.age > Tree.AGE_TO_MAKE_SEEDS)
              .map(t => this.seedsForTree(t))
              .flat()
              .forEach(s => this.sproutTree(s.x, s.y));
  }

  seedsForTree(tree){
    let seedLocations = [];
    let numSeeds = 1;
    let stdDevDropDistance = 20;
    for (var i=0; i<numSeeds; i++){
      seedLocations.push(
          {  x: randomGaussian(tree.x, stdDevDropDistance)
           , y: randomGaussian(tree.y, stdDevDropDistance)
          }
        );
    }
    return seedLocations;
  }

  draw(){
    this.trees.forEach((t) => t.draw());
  }
}