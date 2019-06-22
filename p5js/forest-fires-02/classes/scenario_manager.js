class ScenarioManager {
  constructor(){
  }

  load(file_url){
    this.data = loadJSON(file_url);
  }

  defaultScenario(){
    return this.data.scenarios[0];
  }

  loadScenario(idx){
    let scenario = this.data.scenarios[idx];
    randomSeed(scenario.seed);
    noiseSeed(scenario.seed);
    system.init(scenario);
  }
}
