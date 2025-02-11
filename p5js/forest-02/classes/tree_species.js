class TreeSpecies {
  constructor(){
    this.name = "Species 1";
    this.trunkColor = color(100, 200, 100);
    this.maxAge = 200;
    this.yearsAsSapling = 4;
    this.yearsAsMature = 140;
    this.maxShadowRadius = 100;
    this.ageToMakeSeeds = 40;
    this.maxHeight = 15; // in meter
    this.growRateWhileSapling = 0.2;
    this.growRateWhileMature = 0.8;
    this.fullnessResilencyFactor =  0.5;
    this.fullnessVulnerabilityFactor = 2;

    this.seeds_per_tree = 2;
    this.seed_drop_dist = 30;
    // this.is_foraged = true; // All trees are foraged for now

    // To Add
    // split up Vulnerability factor
    // Shade Tolerance ... 
    // Drought Tolerance 
    // Heat
    // Nutrient defiency
    // eg: https://treecompendium.com/betula-papyrifera/
  }

  static get SlowAndResilient(){
    // GIST: 
    const species = new TreeSpecies();
    species.name = "Slow Poke";
    species.trunkColor = color(200, 100, 100);
    species.maxAge = 800;
    species.yearsAsSapling = 40;
    species.yearsAsMature = 600;
    species.maxShadowRadius = 60;
    species.ageToMakeSeeds = 40;
    species.maxHeight = 100;
    species.growRateWhileSapling = 0.01;
    species.growRateWhileMature = 0.02;
    species.fullnessResilencyFactor =  3;
    species.fullnessVulnerabilityFactor = 0.0001;

    species.seeds_per_tree = 2;
    species.seed_drop_dist = 5;

    return species;
  }

  static get FastShortWeak(){
    // GIST: Invasive species; quick growing
    const species = new TreeSpecies();
    species.name = "Fast-Short-Weak";
    species.trunkColor = color(200, 200, 100);
    species.maxAge = 30;
    species.yearsAsSapling = 5;
    species.yearsAsMature = 20;
    species.maxShadowRadius = 30;
    species.ageToMakeSeeds = 10;
    species.maxHeight = 70;
    species.growRateWhileSapling = 0.4;
    species.growRateWhileMature = 0.2;
    species.fullnessResilencyFactor =  0.01;
    species.fullnessVulnerabilityFactor = 1;

    species.seeds_per_tree = 5;
    species.seed_drop_dist = 40;

    return species;
  }
  
}