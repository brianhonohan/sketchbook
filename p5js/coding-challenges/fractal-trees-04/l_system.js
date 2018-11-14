class LSystem {
  constructor(params){
    this.params = params;
    this.currentStr = params.axiom;
    this.instructions = this.currentStr.split('');
  }

  step(){
    this.currentStr = this.currentStr.replace(/F/g, this.params.rule);
    this.instructions = this.currentStr.split('');
    return this.currentStr;
  }
}
