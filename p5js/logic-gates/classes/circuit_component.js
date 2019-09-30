class CircuitComponent {
  constructor(x, y, type){
    this.origPos = createVector(x, y);
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
    this.shape = this._makeShape();
    this._configShape();
    this._initInputs();
    this._initOutputs();
  }

  static get defaultSize() { return 50; }

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
    }
  }

  _makeShape(){
    switch(this.type) {
      case CircuitComponent.TYPE_OUTPUT_LED: return new Circle(this.x, this.y, CircuitComponent.defaultSize / 2);
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
    let vertSpacing = this.shape.height / (this.node.numInputs + 1);

    for (var i = 0; i < this.node.numInputs; i++){
      let tmpPt = new Point(this.shape.minX - 10, this.shape.minY + (1 + i) * vertSpacing);
      this.inputPoints.push( tmpPt );
    }
  }

  _initOutputs(){
    if (this.node.numOutputs == 0){
      return;
    }
    let vertSpacing = this.shape.height / (this.node.numOutputs + 1);

    for (var i = 0; i < this.node.numOutputs; i++){
      let tmpPt = new Point(this.shape.maxX + 10, this.shape.minY + (1 + i) * vertSpacing);
      this.outputPoints.push( tmpPt );
    }
  }

  handleMousePressed(){
    if (this.shape.containsXY(mouseX, mouseY) == false){
      return false;
    }

    if (this.node['handleUserToggle']){
      this.node.handleUserToggle();
      return true;
    }
    return false;
  }

  handleMouseReleased(){
    if (this.node['handleUserToggle']){
      this.node.handleUserToggle();
      return true;
    }
    return false;
  }

  get posAndSize(){
    return [this.x, this.y, CircuitComponent.defaultSize, CircuitComponent.defaultSize];
  }

  setStrokeForOutput(){
    if (this.node.output()){
      stroke(colorScheme.lineOn);
    } else {
      stroke(colorScheme.lineOff);
    }
  }

  render(){
    this.setStrokeForOutput();
    strokeWeight(2);
    this.shape.draw();
    this.renderInputs();
    this.renderOutputs();

    noStroke();
    fill(colorScheme.line);
    textAlign(CENTER, CENTER);
    text(this.node.label, this.shape.centerX, this.shape.centerY);

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

  _renderPushSwitch(direction){
    this.setStrokeForOutput();

    let smallLength = this.shape.width * 0.25;
    line(this.shape.minX, this.shape.centerY, this.shape.minX + smallLength, this.shape.centerY);
    line(this.shape.maxX, this.shape.centerY, this.shape.maxX - smallLength, this.shape.centerY);

    let largeLength = this.shape.width - 2 * smallLength;
    let deltaY = this.shape.height * 0.2;
    let connectionY = (this.node.closed) ? this.shape.centerY : this.shape.centerY + deltaY * direction;
    line(this.shape.minX + smallLength, connectionY, this.shape.maxX - smallLength, connectionY);

    let plungerHeight = this.shape.height * 0.2;
    line(this.shape.centerX, connectionY, this.shape.centerX, connectionY - plungerHeight);
  }

  renderInputs(){
    this.inputPoints.forEach(p => this.drawPoint(p));
  }
  renderOutputs(){
    this.outputPoints.forEach(p => this.drawPoint(p));
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
