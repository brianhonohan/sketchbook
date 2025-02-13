class TreeSpecies {
  constructor(){
    this.name = "Species 1";
    this.trunkColor = P5JsUtils.rgbColorToHex(color(100, 200, 100));
    this.maxAge = 200;
    this.yearsAsSapling = 4;
    this.yearsAsMature = 140;
    this.maxShadowRadius = 100;
    this.ageToMakeSeeds = 40;
    this.maxHeight = 15;
    this.growRateWhileSapling = 0.2; // Percent of maxHeight grown as sapling, if full resources
    this.growRateWhileMature = 0.8; // Percent of maxHeight grown as mature tree, if full resources
    this.fullnessResilencyFactor =  0.5;
    this.fullnessVulnerabilityFactor = 2;

    this.seedsPerTree = 2;
    this.seedDropDist = 30;
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
    species.trunkColor = P5JsUtils.rgbColorToHex(color(200, 100, 100));
    species.maxAge = 800;
    species.yearsAsSapling = 40;
    species.yearsAsMature = 600;
    species.maxShadowRadius = 60;
    species.ageToMakeSeeds = 40;
    species.maxHeight = 100;
    species.growRateWhileSapling = 0.01;
    species.growRateWhileMature = 0.02;
    species.fullnessResilencyFactor =  2;
    species.fullnessVulnerabilityFactor = 0.001;

    species.seedsPerTree = 1;
    species.seedDropDist = 30;

    return species;
  }

  static get FastShortWeak(){
    // GIST: Invasive species; quick growing
    const species = new TreeSpecies();
    species.name = "Fast-Short-Weak";
    species.trunkColor = P5JsUtils.rgbColorToHex(color(200, 200, 100));
    species.maxAge = 50;
    species.yearsAsSapling = 5;
    species.yearsAsMature = 20;
    species.maxShadowRadius = 30;
    species.ageToMakeSeeds = 10;
    species.maxHeight = 70;
    species.growRateWhileSapling = 0.4;
    species.growRateWhileMature = 0.2;
    species.fullnessResilencyFactor =  0.01;
    species.fullnessVulnerabilityFactor = 0.8;

    species.seedsPerTree = 5;
    species.seedDropDist = 100;

    return species;
  }
  
}