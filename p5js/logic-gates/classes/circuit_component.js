class CircuitComponent {
  constructor(x, y, type, size = undefined, nodeSettings){
    this.origPos = createVector(x, y);
    this.nodeSettings = nodeSettings;
    this.size = size || CircuitComponent.defaultSize;
    this.node = undefined;
    this.shape = undefined;
    this.inputPoints  = [];
    this.outputPoints = [];
    this.setType(type);
  }

  get x(){ return (this.shape) ? this.shape.x : this.origPos.x; }
  get y(){ return (this.shape) ? this.shape.y : this.origPos.y; }

  setType(type){
    this.type = type;
    this.node = CircuitComponent.nodeForType(type);
    if (this.nodeSettings) {
      this.node.applySettings(this.nodeSettings);
    }
    this.shape = this._makeShape();
    this._configShape();
    this._initInputs();
    this._initOutputs();
    this._initTickHandling();
  }

  static get defaultSize() { return 50; }

  setSize(newSize){
    this.size = newSize;
    this.shape.setSize(this.size);
  }

  static get TYPE_INPUT_OFF() { return 0; }
  static get TYPE_INPUT_ON()  { return 1; }
  static get TYPE_OUTPUT_LED(){ return 2; }
  static get TYPE_BUTTON()    { return 3; }
  static get TYPE_NOOP()      { return 4; }
  static get TYPE_NOT()       { return 5; }
  static get TYPE_AND()       { return 6; }
  static get TYPE_OR()        { return 7; }
  static get TYPE_NAND()      { return 8; }
  static get TYPE_NOR()       { return 9; }
  static get TYPE_XOR()       { return 10; }
  static get TYPE_XNOR()      { return 11; }
  static get TYPE_PUSH_OFF(){ return 12; }
  static get TYPE_PUSH_ON() { return 13; }
  static get TYPE_SWITCH_SPST() { return 14; }
  static get TYPE_SWITCH_SPDT() { return 15; }
  static get TYPE_SWITCH_FSPDT() { return 16; }
  static get TYPE_CLOCK() { return 17; }

  static nodeForType(type){
    switch(type) {
      case CircuitComponent.TYPE_INPUT_OFF: return new Input({signal: 0});
      case CircuitComponent.TYPE_INPUT_ON: return new Input({signal: 1});
      case CircuitComponent.TYPE_OUTPUT_LED: return new Output();
      case CircuitComponent.TYPE_BUTTON:   return new Button({signal: 0});
      case CircuitComponent.TYPE_NOOP:  return new Gate({type: Logic.OP_NOOP});
      case CircuitComponent.TYPE_NOT:   return new Gate({type: Logic.OP_NOT});
      case CircuitComponent.TYPE_AND:   return new Gate({type: Logic.OP_AND});
      case CircuitComponent.TYPE_OR:    return new Gate({type: Logic.OP_OR});
      case CircuitComponent.TYPE_NAND:  return new Gate({type: Logic.OP_NAND});
      case CircuitComponent.TYPE_NOR:   return new Gate({type: Logic.OP_NOR});
      case CircuitComponent.TYPE_XOR:   return new Gate({type: Logic.OP_XOR});
      case CircuitComponent.TYPE_XNOR:  return new Gate({type: Logic.OP_XNOR});
      case CircuitComponent.TYPE_PUSH_OFF: return new PushSwitch({closed: false});
      case CircuitComponent.TYPE_PUSH_ON:  return new PushSwitch({closed: true});
      case CircuitComponent.TYPE_SWITCH_SPST:  return new SinglePoleSingleThrow({closed: true});
      case CircuitComponent.TYPE_SWITCH_SPDT:  return new SinglePoleDoubleThrow({activeOutput: 0});
      case CircuitComponent.TYPE_SWITCH_FSPDT:  return new FlippedSinglePoleDoubleThrow({activeInput: 0});
      case CircuitComponent.TYPE_CLOCK:  return new ClockSignal();
    }
  }

  _makeShape(){
    switch(this.type) {
      case CircuitComponent.TYPE_OUTPUT_LED: return new Circle(this.x, this.y, this.size / 2);
      default: return new Rectangle(...this.posAndSize);
    }
  }

  _configShape(){
    this.shape.fillColor = colorScheme.object;
  }

  _initInputs(){
    if (this.node.numInputs == 0){
      return;
    }

    for (var i = 0; i < this.node.numInputs; i++){
      let leadY = this._yOfNthConnector(this.node.numInputs, i);
      let tmpPt = new Point(this.shape.minX - 10, leadY);
      this.inputPoints.push( tmpPt );
    }
  }

  _initOutputs(){
    if (this.node.numOutputs == 0){
      return;
    }

    for (var i = 0; i < this.node.numOutputs; i++){
      let leadY = this._yOfNthConnector(this.node.numOutputs, i);
      let tmpPt = new Point(this.shape.maxX + 10, leadY);
      this.outputPoints.push( tmpPt );
    }
  }

  _initTickHandling(){
    if (this.node.tick != undefined) {
      this.handleTick = function(){ this.node.tick(); };
    }
  }

  handleMousePressed(){
    if (this.shape.containsXY(mouseX, mouseY) == false){
      return false;
    }

    if (this.node['handleToggleStart']){
      this.node.handleToggleStart();
      return true;
    }
    return false;
  }

  handleMouseReleased(){
    if (this.node['handleToggleEnd']){
      this.node.handleToggleEnd();
      return true;
    }
    return false;
  }

  isClickable(){
    return Logic.or(this.node['handleToggleStart'], this.node['handleToggleEnd']);
  }

  get posAndSize(){
    return [this.x, this.y, this.size, this.size];
  }

  setStrokeForOutput(){
    this.setStrokeForSignal(this.node.output());
  }

  setStrokeForSignal(signal){
    if (signal){
      stroke(colorScheme.lineOn);
    } else {
      stroke(colorScheme.lineOff);
    }
  }

  setFill(){
    this.shape.fillColor = this.isClickable() ? colorScheme.objectClickable : colorScheme.object;
  }

  render(){
    this.setStrokeForSignal(this.node.output(CircuitBase.ANY_OUTPUT));
    strokeWeight(2);
    this.setFill();
    this.shape.draw();
    this.renderInputs();
    this.renderOutputs();

    if (this.node.label) {
      noStroke();
      fill(colorScheme.line);
      textAlign(CENTER, CENTER);
      text(this.node.label, this.shape.centerX, this.shape.centerY);
    }

    this.postRenderForType();
  }

  postRenderForType(){
    let renderMethod = this[`_postRenderForType${this.type}`];
    if (renderMethod){
      renderMethod.call(this);
    }
  }

  _postRenderForType12(){
    this._renderPushSwitch(-1);
  }

  _postRenderForType13(){
    this._renderPushSwitch(1);
  }

  _postRenderForType14(){
    this.setStrokeForOutput();
    this._renderInternalLeads();

    this.setStrokeForSignal(this.node.input());
    if (this.node.closed) {
      line(this.leftInternalLeadX, this.shape.centerY, this.rightInternalLeadX, this.shape.centerY);
    } else {
      let switchLatch = createVector(this.rightInternalLeadX - this.leftInternalLeadX, 0);
      switchLatch.rotate(- Math.PI / 4);
      line(this.leftInternalLeadX, this.shape.centerY, 
              this.leftInternalLeadX + switchLatch.x, 
              this.shape.centerY + switchLatch.y);
    }
  }

  _postRenderForType15(){
    this._renderInternalLeads();

    this.setStrokeForSignal(this.node.input());
    let leadY = this._yOfNthConnector(this.node.numOutputs, this.node.activeOutput);
    line(this.leftInternalLeadX, this.shape.centerY, this.rightInternalLeadX, leadY);
  }

  _postRenderForType16(){
    this._renderInternalLeads();

    this.setStrokeForSignal(this.node.output());
    let leadY = this._yOfNthConnector(this.node.numInputs, this.node.activeInput);
    line(this.leftInternalLeadX, leadY, this.rightInternalLeadX, this.shape.centerY);
  }

  get internalLeadLength() { return this.shape.width * 0.25; }
  get leftInternalLeadX() { return this.shape.minX + this.internalLeadLength; }
  get rightInternalLeadX() { return this.shape.maxX - this.internalLeadLength; }

  _renderPushSwitch(direction){
    this.setStrokeForOutput();

    this._renderInternalLeads();

    let deltaY = this.shape.height * 0.2;
    let connectionY = (this.node.closed) ? this.shape.centerY : this.shape.centerY + deltaY * direction;
    line(this.leftInternalLeadX, connectionY, this.rightInternalLeadX, connectionY);

    let plungerHeight = this.shape.height * 0.2;
    line(this.shape.centerX, connectionY, this.shape.centerX, connectionY - plungerHeight);
  }

  _renderInternalLeads(){
    this._renderInternalInputLeads();
    this._renderInternalOutputLeads();
  }

  _renderInternalInputLeads(){
    if (this.node.numInputs == 0){ return; }

    for (var i = 0; i < this.node.numInputs; i++){
      this.setStrokeForSignal(this.node.input(i));
      let leadY = this._yOfNthConnector(this.node.numInputs, i);
      line(this.shape.minX,leadY, this.leftInternalLeadX, leadY);
    }
  }

  _renderInternalOutputLeads(){
    if (this.node.numOutputs == 0){ return; }

    for (var i = 0; i < this.node.numOutputs; i++){
      this.setStrokeForSignal(this.node.output(i));
      let leadY = this._yOfNthConnector(this.node.numOutputs, i);
      line(this.shape.maxX,leadY, this.rightInternalLeadX, leadY);
    }
  }

  _yOfNthConnector(numConnectors, idx){
    let vertSpacing = this.shape.height / (numConnectors + 1);
    return this.shape.minY + (1 + idx) * vertSpacing;
  }

  renderInputs(){
    this.inputPoints.forEach((p, idx) => {
      this.setStrokeForSignal(this.node.input(idx));
      this.drawPoint(p)
    });
  }
  renderOutputs(){
    this.outputPoints.forEach((p, idx) => {
      this.setStrokeForSignal(this.node.output(idx));
      this.drawPoint(p)
    });
  }

  drawPoint(point){
    this.drawConnectorWire(point);
    if (point.containsXY(mouseX, mouseY)){
      fill(200, 200, 100);
    }else {
      fill(colorScheme.object);
    }
    ellipse(point.x, point.y, point.radius, point.radius);
  }

  drawConnectorWire(point){
    if (point.x > this.shape.maxX){
      line(point.x, point.y, this.shape.maxX, point.y);
    } else {
      line(point.x, point.y, this.shape.minX, point.y);
    }
  }
}
