class System {
  constructor(p_xSizeAndPos){
    this.sizeAndPosition = p_xSizeAndPos;
    this.numExamples = 3;
  }

  init(p_xSettings){
    if (p_xSettings){
      this.settings = p_xSettings;
    } else {
      this.optionsSet = new OptionsSet(this.optionsMetadata());
      this.settings = this.optionsSet.settings;
    }

    this.components = [];
    this.lastPressed = undefined;

    if (this.settings.scenario) {
      this[`initExample${this.settings.scenario}`]();
    }
  }

  // Return a list of Options, specific to this sketch,
  // that can be tweaked via the URL parameters
  // separate from the default P5JsSettings that are supported
  //
  // supported types: integer, float, string
  optionsMetadata(){
    return [
      { name: "scenario", type: "number", default: 1}, 
      // { name: "varname3", type: "float", default: 0.6}
    ];
  }

  handleMousePressed(){
    this.lastPressed = this.components.filter(c => c['handleMousePressed'] != undefined)
                                      .find(c => c.handleMousePressed());
  }

  handleMouseReleased(){
    if (this.lastPressed){
      this.lastPressed.handleMouseReleased();
    }
    this.lastPressed = undefined;
  }

  initExample1(){
    let blockSize = 50;  // cheating knowledge of block
    let marginX = 0.2 * width;
    let marginY = 0.2 * height;
    this.components.push( new CircuitComponent(marginX, marginY, CircuitComponent.TYPE_BUTTON) );
    this.components.push( new CircuitComponent(marginX, height - marginY - blockSize, CircuitComponent.TYPE_INPUT_ON) );

    this.mainGate = new CircuitComponent(width / 2, height / 2 - blockSize / 2, CircuitComponent.TYPE_AND);
    this.components.push( this.mainGate );

    this.components.push( new CircuitComponent(width - marginX - blockSize, height / 2, CircuitComponent.TYPE_OUTPUT_LED) );

    this.components.push( this.wireUp(this.components[0], 0, this.components[2], 0) );
    this.components.push( this.wireUp(this.components[1], 0, this.components[2], 1) );
    this.components.push( this.wireUp(this.components[2], 0, this.components[3], 0) );
  }

  initExample2(){
    let blockSize = 50;  // cheating knowledge of block
    let marginX = 0.2 * width;
    let marginY = 0.2 * height;

    this.components.push( new CircuitComponent(marginX, marginY, CircuitComponent.TYPE_INPUT_ON) );
    this.components.push( new CircuitComponent(width / 2 - blockSize / 2, marginY, CircuitComponent.TYPE_PUSH_OFF) );
    this.components.push( new CircuitComponent(width - marginX - blockSize, marginY + blockSize / 2, CircuitComponent.TYPE_OUTPUT_LED) );

    this.components.push( this.wireUp(this.components[0], 0, this.components[1], 0) );
    this.components.push( this.wireUp(this.components[1], 0, this.components[2], 0) );

    this.components.push( new CircuitComponent(marginX, height - marginY - blockSize, CircuitComponent.TYPE_INPUT_ON) );
    this.components.push( new CircuitComponent(width / 2 - blockSize / 2, height - marginY - blockSize, CircuitComponent.TYPE_PUSH_ON) );
    this.components.push( new CircuitComponent(width - marginX - blockSize, height - marginY - blockSize / 2, CircuitComponent.TYPE_OUTPUT_LED) );

    this.components.push( this.wireUp(this.components[5], 0, this.components[6], 0) );
    this.components.push( this.wireUp(this.components[6], 0, this.components[7], 0) );
  }

  initExample3(){
    let blockSize = 50;  // cheating knowledge of block
    let marginX = 0.2 * width;
    let marginY = 0.2 * height;

    this.components.push( new CircuitComponent(marginX, marginY, CircuitComponent.TYPE_INPUT_ON) );
    this.components.push( new CircuitComponent(width / 2 - blockSize / 2, marginY, CircuitComponent.TYPE_SWITCH_SPST) );
    this.components.push( new CircuitComponent(width - marginX - blockSize, marginY + blockSize / 2, CircuitComponent.TYPE_OUTPUT_LED) );

    this.components.push( this.wireUp(this.components[0], 0, this.components[1], 0) );
    this.components.push( this.wireUp(this.components[1], 0, this.components[2], 0) );

    this.components.push( new CircuitComponent(marginX, height / 2 - blockSize / 2, CircuitComponent.TYPE_INPUT_ON) );
    this.components.push( new CircuitComponent(width / 2 - blockSize / 2, height / 2 - blockSize / 2, CircuitComponent.TYPE_SWITCH_SPDT) );
    this.components.push( new CircuitComponent(width - marginX - blockSize,  height / 2 - blockSize, CircuitComponent.TYPE_OUTPUT_LED) );
    this.components.push( new CircuitComponent(width - marginX - blockSize,  height / 2 + blockSize, CircuitComponent.TYPE_OUTPUT_LED) );

    this.components.push( this.wireUp(this.components[5], 0, this.components[6], 0) );
    this.components.push( this.wireUp(this.components[6], 0, this.components[7], 0) );
    this.components.push( this.wireUp(this.components[6], 1, this.components[8], 0) );

    this.components.push( new CircuitComponent(marginX, height - marginY - 2.5 * blockSize, CircuitComponent.TYPE_INPUT_ON) );
    this.components.push( new CircuitComponent(marginX, height - marginY - 0.5 * blockSize, CircuitComponent.TYPE_INPUT_OFF) );
    this.components.push( new CircuitComponent(width / 2 - blockSize / 2, height - marginY - 1.5 * blockSize, CircuitComponent.TYPE_SWITCH_FSPDT) );
    this.components.push( new CircuitComponent(width - marginX - blockSize, height - marginY - blockSize, CircuitComponent.TYPE_OUTPUT_LED) );

    this.components.push( this.wireUp(this.components[12], 0, this.components[14], 0) );
    this.components.push( this.wireUp(this.components[13], 0, this.components[14], 1) );
    this.components.push( this.wireUp(this.components[14], 0, this.components[15], 0) );
  }

  wireUp(startComp, startOutIdx, endComp, endInIdx){
    let wire = new WireSegment();
    wire.startAtNode(startComp, startOutIdx);
    wire.endAtNode(endComp, endInIdx);
    return wire;
  }

  setMainGate(newType){
    this.mainGate.node.type = newType;
  }

  render(){
    background(colorScheme.background);
    this.components.filter(c => (c instanceof WireSegment))
                   .forEach(c => c.render());
    this.components.filter(c => !(c instanceof WireSegment))
                    .forEach(c => c.render());
  }
}
