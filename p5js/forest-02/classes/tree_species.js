class TreeSpecies {
  constructor(){
    this.name = "Species 1";
    this.trunkColor = color(100, 200, 100);
    this.maxAge = 200;
    this.yearsAsSapling = 4;
    this.yearsAsMature = 140;
    this.maxShadowRadius = 100;
    this.ageToMakeSeeds = 40;
    this.maxHeight = 15;
    this.growRateWhileSapling = 0.2;
    this.growRateWhileMature = 0.8;
    this.fullnessResilencyFactor =  0.5;
    this.fullnessVulnerabilityFactor = 2;

    this.seeds_per_tree = 2;
    this.seed_drop_dist = 30;
    // this.is_foraged = true; // All trees are foraged for now
  }
}