class ScenarioManager {
  constructor(){
  }

  get scenarios(){ return this.data.scenarios; }

  load(file_url){
    this.data = loadJSON(file_url);
  }

  defaultScenario(){
    return this.data.scenarios[0];
  }

  loadScenario(idx){
    let scenario = this.data.scenarios[idx];
    system.init( UtilFunctions.shallowCopy(scenario) );
  }

  loadScenarioByName(name){
    let idx = this.data.scenarios.findIndex(scenario => scenario.name === name);
    if (idx < 0) {
      logError(`Unexpected scenario name: ${name}`);
      return;
    }
    this.loadScenario(idx);
  }
}
