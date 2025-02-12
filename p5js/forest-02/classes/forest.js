class Forest {
  constructor(area, system){
    this.area = area;
    this.ecosystem = system;
    this.params = system.params;
    this.trees = [];
    this.treeCounter = 0;

    this.treeSpecies = [];
    this.treeSpecies.push(new TreeSpecies());
    this.treeSpecies.push(TreeSpecies.SlowAndResilient);
    this.treeSpecies.push(TreeSpecies.FastShortWeak);


    let speciesIndex;
    for (var i = 0; i < this.params.initial_trees; i++){
      let tmpX = this.centerX + (random() - 0.5) * this.width * 0.8;
      let tmpY = this.centerY + (random() - 0.5) * this.height * 0.8;
      speciesIndex = Math.floor(random(this.treeSpecies.length));

      this.sproutTree(tmpX, tmpY, speciesIndex);
    }

    this.prevSeason = undefined;
  }

  get centerX() { return this.area.centerX; }
  get centerY() { return this.area.centerY; }
  get width()  { return this.area._width; }
  get height() { return this.area._height; }

  sproutTree(x, y, speciesIndex = 0){
    this.sproutTreeForSpecies(x, y, this.treeSpecies[speciesIndex]);
  }

  sproutTreeForSpecies(x, y, species){
    // TODO: Remove this cap, or make more prominent
    if (this.trees.length > 700) { 
      // consol/e.log('no more room at the inn');
      return; 
    }
    this.trees.push( new Tree(x, y, 0, this.treeCounter++, species) );
  }

  tick(){
    this.rebuildQuadSearchTree();
    this.trees.forEach(t => t.tick( this.resourcesForTree(t) ));
    this.lossDueToCompetition();
    this.lossDueToMaxAge();
    this.lossDueToForaging();
    this.triggerSeasonalBehavior();
    this.lossDueToOutOfBounds();
  }

  rebuildQuadSearchTree(){
    this.quadtree = new Quadtree(this.area, 10, false);
    for (let i = 0; i < this.trees.length; i++){
      this.quadtree.add(this.trees[i]);
    }
  }

  lossDueToCompetition(){
    this.trees = this.trees.filter(t => t.fullness > 0);
  }

  lossDueToMaxAge(){
    this.trees = this.trees.filter(t => t.age < t.species.maxAge);
  }

  lossDueToForaging(){
    const durationSusceptibleToForaging = 10;
    const durationInTicks = durationSusceptibleToForaging / System.YEARS_PER_TICK;
    const pOfDeathDueToForaging = this.params.foraging_rate; // function of herbivores in area
    const pOfSurvivalDespiteForaging = 1 - pOfDeathDueToForaging;
    const pSurvivalInGivenTick = Math.pow(pOfSurvivalDespiteForaging, 1 / durationInTicks);

    this.trees = this.trees.filter(t => {
      let treeIsOldEnough = t.age > durationSusceptibleToForaging;
      let treeAvoidedForaging = (Math.random() < pSurvivalInGivenTick);
      return treeIsOldEnough || treeAvoidedForaging;
    });
  }

  lossDueToOutOfBounds(){
    this.trees = this.trees.filter(t => this.area.containsXY(t.x, t.y));
  }

  resourcesForTree(tree){
    // TODO: Longer term, consider beneficial aspects of mother trees, and same species
    const competingTrees = this.quadtree.find(tree);
    
    return competingTrees.filter(t => t != tree)
                     .map(otherTree => this.resourcesClaimedByTree(otherTree, tree))
                     .reduce((remainder, val) => remainder - val, 1);
  }

  resourcesClaimedByTree(claimingTree, losingTree){
    const dist = claimingTree.distFrom(losingTree);
    const claimersRadius = claimingTree.shadowRadius();
    const losersRadius = losingTree.shadowRadius();

    if (dist > (claimersRadius + losersRadius)){
      return 0;
    }

    // The area of the smaller circle, overlapping with the larger one,
    // represents the contested resources.
    const widthOfOverlap = (claimersRadius + losersRadius) - dist;
    const smallerRadius  = Math.min(claimersRadius, losersRadius);
    const largerRadius   = Math.max(claimersRadius, losersRadius);

    let approxPcntOfSmallerArea;
    if ( (dist + smallerRadius) < largerRadius){
      // smaller is completely in the 'resourceShadow' of the larger
      approxPcntOfSmallerArea = 1.0;
    } else if (dist > largerRadius){
      // smaller is centered outside the resourceShadow of larger
      approxPcntOfSmallerArea = 0.8 * widthOfOverlap / (2 * smallerRadius);
    } else {
      // smaller is partially inside the resourceShadow
      approxPcntOfSmallerArea = 1.2 * widthOfOverlap / (2 * smallerRadius);
    }

    const rootCompFactor = 0.5;
    const sunlightLossFactor = (losingTree.verticalExtent < claimingTree.verticalExtent) ? 0.5 : 0;
    const combinedLossFactor = (rootCompFactor + sunlightLossFactor);

    // % Resource Loss = (% of Smaller Overlapping x Area of Smaller) / Area of Larger x Weighting Factors 
    
    // ratio of areas of 2 circles is the ratio of their Radii squared; PI cancels out
    const areaRatioOfLoser = smallerRadius * smallerRadius / (losersRadius * losersRadius);
    const pcntResourcesLoss = approxPcntOfSmallerArea * areaRatioOfLoser * combinedLossFactor;
    return pcntResourcesLoss;
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
    this.trees.filter(t => t.age > t.species.ageToMakeSeeds)
              .map(t => this.seedsForTree(t))
              .flat()
              .forEach(s => this.sproutTreeForSpecies(s.x, s.y, s.species));
  }

  seedsForTree(tree){
    let seedLocations = [];
    let numSeeds = this.params.seeds_per_tree;
    let stdDevDropDistance = this.params.seed_drop_dist;
    for (var i=0; i<numSeeds; i++){
      seedLocations.push(
          {  x: randomGaussian(tree.x, stdDevDropDistance)
           , y: randomGaussian(tree.y, stdDevDropDistance)
           , species: tree.species
          }
        );
    }
    return seedLocations;
  }

  draw(){
    this.trees.forEach((t) => t.draw());
  }
}