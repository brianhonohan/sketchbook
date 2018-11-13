class LSystem {
  constructor(axiom, rule){
    this.axiom = axiom;
    this.rule = rule;
    this.currentStr = this.axiom;
    this.instructions = this.currentStr.split('');
  }

  step(){
    this.currentStr = this.currentStr.replace(/F/g, this.rule);
    this.instructions = this.currentStr.split('');
    return this.currentStr;
  }
}
