class TreeSpecies {
  constructor(){
    this.name = "Species 1";
    this.trunk_color = color(100, 200, 100);
    this.maxAge = 200;
    this.yearsAsSapling = 4;
    this.yearsAsMature = 140;
    this.maxShadowRadius = 100;
    this.ageToMakeSeeds = 40;
    this.maxHeight = 15;
    this.grow_rate_while_sapling = 0.2;
    this.grow_rate_while_mature = 0.8;
    this.fullness_resilency_factor =  0.5;
    this.fullness_vulnerability = 2;

    this.seeds_per_tree = 2;
    this.seed_drop_dist = 30;
    // this.is_foraged = true; // All trees are foraged for now
  }
}