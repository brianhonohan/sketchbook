class System {
  constructor(p_xSizeAndPos){
    this.sizeAndPosition = p_xSizeAndPos;
    this.numExamples = 4;
    this.boundHandlerClockFlip = this.handleClockFlip.bind(this);
  }

  init(p_xSettings){
    if (p_xSettings){
      this.settings = p_xSettings;
    } else {
      this.optionsSet = new OptionsSet(this.optionsMetadata());
      this.settings = this.optionsSet.settings;
    }

    this.needsRender = true;
    this.components = [];
    this.tickComponents = [];
    this.lastPressed = undefined;

    if (this.settings.scenario) {
      this[`initExample${this.settings.scenario}`]();
      this.resizeComponents( this.componentSize );
    }
    this.tickComponents = this.components.filter(c => c['handleTick'] != undefined);
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
    if (this.lastPressed) {
      this.needsRender = true;
    }
  }

  handleMouseReleased(){
    if (this.lastPressed){
      this.lastPressed.handleMouseReleased();
      this.needsRender = true;
    }
    this.lastPressed = undefined;
  }

  get componentSize(){ return (width < 500 || height < 400) ? 40 : 50; }
  get marginX(){ return (width > 500) ? 0.2 * width : 0.1 * width; }
  get marginY(){ return (height > 400) ? 0.2 * height : 0.12 * height; }

  resizeComponents(newSize){
    this.components.filter(c => c.size !== undefined)
                   .forEach(c => c.setSize(newSize) );
  }

  initExample1(){
    let blockSize = this.componentSize;
    let marginX = this.marginX;
    let marginY = 0.2 * height;
    this.components.push( new CircuitComponent(marginX, marginY, CircuitComponent.TYPE_BUTTON) );
    this.components.push( new CircuitComponent(marginX, height - marginY - blockSize, CircuitComponent.TYPE_INPUT_ON) );

    let mainGateY = height / 2 - blockSize / 2;
    console.log(`mainGateY: ${mainGateY}`);
    this.mainGate = new CircuitComponent(width / 2, mainGateY, CircuitComponent.TYPE_AND, blockSize);
    this.components.push( this.mainGate );

    this.components.push( new CircuitComponent(width - marginX - blockSize, height / 2, CircuitComponent.TYPE_OUTPUT_LED) );

    this.components.push( this.wireUp(this.components[0], 0, this.components[2], 0) );
    this.components.push( this.wireUp(this.components[1], 0, this.components[2], 1) );
    this.components.push( this.wireUp(this.components[2], 0, this.components[3], 0) );
  }

  initExample2(){
    let blockSize = this.componentSize;
    let marginX = this.marginX;
    let marginY = 0.2 * height;

    this.components.push( new CircuitComponent(marginX, marginY, CircuitComponent.TYPE_INPUT_ON, blockSize) );
    this.components.push( new CircuitComponent(width / 2 - blockSize / 2, marginY, CircuitComponent.TYPE_PUSH_OFF, blockSize) );
    this.components.push( new CircuitComponent(width - marginX - blockSize, marginY + blockSize / 2, CircuitComponent.TYPE_OUTPUT_LED) );

    this.components.push( this.wireUp(this.components[0], 0, this.components[1], 0) );
    this.components.push( this.wireUp(this.components[1], 0, this.components[2], 0) );

    this.components.push( new CircuitComponent(marginX, height - marginY - blockSize, CircuitComponent.TYPE_INPUT_ON, blockSize) );
    this.components.push( new CircuitComponent(width / 2 - blockSize / 2, height - marginY - blockSize, CircuitComponent.TYPE_PUSH_ON, blockSize) );
    this.components.push( new CircuitComponent(width - marginX - blockSize, height - marginY - blockSize / 2, CircuitComponent.TYPE_OUTPUT_LED) );

    this.components.push( this.wireUp(this.components[5], 0, this.components[6], 0) );
    this.components.push( this.wireUp(this.components[6], 0, this.components[7], 0) );
  }

  initExample3(){
    let blockSize = this.componentSize;
    let marginX = this.marginX;
    let marginY = this.marginY;

    this.components.push( new CircuitComponent(marginX, marginY, CircuitComponent.TYPE_INPUT_ON, blockSize) );
    this.components.push( new CircuitComponent(width / 2 - blockSize / 2, marginY, CircuitComponent.TYPE_SWITCH_SPST, blockSize) );
    this.components.push( new CircuitComponent(width - marginX - blockSize, marginY + blockSize / 2, CircuitComponent.TYPE_OUTPUT_LED) );

    this.components.push( this.wireUp(this.components[0], 0, this.components[1], 0) );
    this.components.push( this.wireUp(this.components[1], 0, this.components[2], 0) );

    this.components.push( new CircuitComponent(marginX, height / 2 - blockSize / 2, CircuitComponent.TYPE_INPUT_ON, blockSize) );
    this.components.push( new CircuitComponent(width / 2 - blockSize / 2, height / 2 - blockSize / 2, CircuitComponent.TYPE_SWITCH_SPDT, blockSize) );
    this.components.push( new CircuitComponent(width - marginX - blockSize,  height / 2 - 0.75 * blockSize, CircuitComponent.TYPE_OUTPUT_LED) );
    this.components.push( new CircuitComponent(width - marginX - blockSize,  height / 2 + 0.75 * blockSize, CircuitComponent.TYPE_OUTPUT_LED) );

    this.components.push( this.wireUp(this.components[5], 0, this.components[6], 0) );
    this.components.push( this.wireUp(this.components[6], 0, this.components[7], 0) );
    this.components.push( this.wireUp(this.components[6], 1, this.components[8], 0) );

    let baseY = height - marginY - blockSize;
    this.components.push( new CircuitComponent(marginX, baseY - 1.25 * blockSize, CircuitComponent.TYPE_INPUT_ON, blockSize) );
    this.components.push( new CircuitComponent(marginX, baseY + 0.25 * blockSize, CircuitComponent.TYPE_INPUT_OFF, blockSize) );
    this.components.push( new CircuitComponent(width / 2 - blockSize / 2,  baseY - 0.5 * blockSize, CircuitComponent.TYPE_SWITCH_FSPDT, blockSize) );
    this.components.push( new CircuitComponent(width - marginX - blockSize, baseY, CircuitComponent.TYPE_OUTPUT_LED) );

    this.components.push( this.wireUp(this.components[12], 0, this.components[14], 0) );
    this.components.push( this.wireUp(this.components[13], 0, this.components[14], 1) );
    this.components.push( this.wireUp(this.components[14], 0, this.components[15], 0) );
  }

  initExample4(){
    let blockSize = this.componentSize;
    let marginX = this.marginX;
    let marginY = this.marginY;

    let clockSettings = {cycleFlipCallback: this.boundHandlerClockFlip};
    this.components.push( new CircuitComponent(marginX, marginY, CircuitComponent.TYPE_CLOCK, blockSize, clockSettings) );
    this.components.push( new CircuitComponent(width / 2 - blockSize / 2, marginY, CircuitComponent.TYPE_SWITCH_SPST, blockSize) );
    this.components.push( new CircuitComponent(width - marginX - blockSize, marginY + blockSize / 2, CircuitComponent.TYPE_OUTPUT_LED) );

    this.components.push( this.wireUp(this.components[0], 0, this.components[1], 0) );
    this.components.push( this.wireUp(this.components[1], 0, this.components[2], 0) );

    let baseY = height / 2;
    clockSettings = {cycleFlipCallback: this.boundHandlerClockFlip, ticksPerWave: 90};
    this.components.push( new CircuitComponent(marginX, baseY - blockSize / 2, CircuitComponent.TYPE_CLOCK, blockSize, clockSettings) );
    this.components.push( new CircuitComponent(width / 2 - blockSize / 2, baseY - blockSize / 2, CircuitComponent.TYPE_SWITCH_SPST, blockSize) );
    this.components.push( new CircuitComponent(width - marginX - blockSize,  baseY, CircuitComponent.TYPE_OUTPUT_LED) );

    this.components.push( this.wireUp(this.components[5], 0, this.components[6], 0) );
    this.components.push( this.wireUp(this.components[6], 0, this.components[7], 0) );

    baseY = height - marginY - blockSize;
    clockSettings = {cycleFlipCallback: this.boundHandlerClockFlip, ticksPerWave: 100, dutyCycle: 0.2};
    this.components.push( new CircuitComponent(marginX, baseY - 1.25 * blockSize, CircuitComponent.TYPE_CLOCK, blockSize, clockSettings) );

    clockSettings = {cycleFlipCallback: this.boundHandlerClockFlip, ticksPerWave: 100, dutyCycle: 0.8, tickOffset: 80};
    this.components.push( new CircuitComponent(marginX, baseY + 0.25 * blockSize, CircuitComponent.TYPE_CLOCK, blockSize, clockSettings) );
    this.mainGate = new CircuitComponent(width / 2 - blockSize / 2,  baseY - 0.5 * blockSize, CircuitComponent.TYPE_OR, blockSize);
    this.components.push( this.mainGate );
    this.components.push( new CircuitComponent(width - marginX - blockSize, baseY, CircuitComponent.TYPE_OUTPUT_LED) );

    this.components.push( this.wireUp(this.components[10], 0, this.components[12], 0) );
    this.components.push( this.wireUp(this.components[11], 0, this.components[12], 1) );
    this.components.push( this.wireUp(this.components[12], 0, this.components[13], 0) );
  }

  handleClockFlip(clock){
    this.needsRender = true;
  }

  wireUp(startComp, startOutIdx, endComp, endInIdx){
    let wire = new WireSegment();
    wire.startAtNode(startComp, startOutIdx);
    wire.endAtNode(endComp, endInIdx);
    return wire;
  }

  setMainGate(newType){
    this.mainGate.node.type = newType;
    this.needsRender = true;
  }

  tick(){
    this.tickComponents.forEach(c => c.handleTick());
  }

  render(){
    if (this.needsRender == false) {
      return;
    }
    background(colorScheme.background);
    this.components.filter(c => (c instanceof WireSegment))
                   .forEach(c => c.render());
    this.components.filter(c => !(c instanceof WireSegment))
                    .forEach(c => c.render());
    this.needsRender = false;
  }
}
