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
  static get TYPE_INPUT_ON() { return 1; }
  static get TYPE_OUTPUT_LED(){ return 2; }
  static get TYPE_BUTTON(){ return 3; }

  static nodeForType(type){
    switch(type) {
      case CircuitComponent.TYPE_INPUT_OFF: return new Input({signal: 0});
      case CircuitComponent.TYPE_INPUT_ON: return new Input({signal: 1});
      case CircuitComponent.TYPE_OUTPUT_LED: return new Output();
      case CircuitComponent.TYPE_AND: return new Gate({type: Logic.OP_AND});
      case CircuitComponent.TYPE_BUTTON: return new Button({signal: 0});
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

  render(){
    if (this.node.output()){
      stroke(colorScheme.lineOn);
    } else {
      stroke(colorScheme.lineOff);
    }
    strokeWeight(2);
    this.shape.draw();
    this.renderInputs();
    this.renderOutputs();

    noStroke();
    fill(colorScheme.line);
    textAlign(CENTER, CENTER);
    text(this.node.label, this.shape.centerX, this.shape.centerY);
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
