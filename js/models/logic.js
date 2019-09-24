class Logic {

  static noop(input){
    return Logic.truthy(Array.from(arguments)[0]);
  }

  static not(input){
    return !Logic.truthy(Array.from(arguments)[0]);
  }

  static and(){
    return arguments.length > 0
            && Array.from(arguments).findIndex(e => !Logic.truthy(e)) == -1;
  }

  static or(){
    return arguments.length > 0
            && Array.from(arguments).findIndex(e => Logic.truthy(e)) >= 0;
  }

  static nand(){
    return !Logic.and.apply(null, arguments);
  }

  static nor(){
    return !Logic.or.apply(null, arguments);
  }

  static xor(){
    return arguments.length > 0
            && (Array.from(arguments).filter(e => Logic.truthy(e)).length % 2) == 1;
  }

  static xnor(){
    return !Logic.xor.apply(null, arguments);
  }

  static get OP_NOOP() { return 0; }
  static get OP_NOT()  { return 1; }
  static get OP_AND()  { return 2; }
  static get OP_OR()   { return 3; }
  static get OP_NAND() { return 4; }
  static get OP_NOR()  { return 5; }
  static get OP_XOR()  { return 6; }
  static get OP_XNOR() { return 7; }

  static symbolForOp(code){
    return [
      '',
      '!',
      '&',
      '>= 1',
      '!&',
      '!>=1',
      '=1',
      '!=1'
    ][code];
  }

  static opForCode(code){
    return [
      Logic.noop,
      Logic.not,
      Logic.and,
      Logic.or,
      Logic.nand,
      Logic.nor,
      Logic.xor,
      Logic.xnor
    ][code];
  }
  
  // Functions existy / truthy credited to Michael Fogus, in 'Functional Javascript'
  static existy(x) { return x != null; }
  static truthy(x) { return (x !== false) && Logic.existy(x); }
}
