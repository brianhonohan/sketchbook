class System {
  constructor(p_xSizeAndPos){
    this.sizeAndPosition = p_xSizeAndPos;
    this.optionsSet = new OptionsSet(this.optionsMetadata());
    this.settings = this.optionsSet.settings;
    this.dragEnabled = false;

    stroke(255);
    this.shapes = [];
    this.randStart = random(100);
  }

  // Return a list of Options, specific to this sketch,
  // that can be tweaked via the URL parameters
  // separate from the default P5JsSettings that are supported
  //
  // supported types: integer, float, string
  optionsMetadata(){
    return [
      { name: "cellWidth", type: "integer", default: 50}, 
      // { name: "varname2", type: "string", default: 'Lorem Ipsum'}, 
      // { name: "varname3", type: "float", default: 0.6}
    ];
  }

  tick(){
    if (frameCount % 3 == 0 && this.shapes.length < 100) {
      this.addShape();
    }
  }

  resetShapes(){
    this.randStart = random(100);
    this.shapes = [];
  }

  regenerateShapes(){
    this.resetShapes();

    let numShapes = 30;

    for (let i = 0; i < numShapes; i++){
      this.addShape();
    }
  }

  addShape(){
    let i = this.shapes.length;
    let mag = 8 + i * 4;
    let x = width / 2 + mag * cos(i * 0.3);
    let y = height / 2 + mag * sin(i * 0.3);
    this.generateConcentricPaisleyAt(x, y);
  }

  handleMousePressed(){
    const shapePressed = this.shapes.filter(s => s.dragEnabled)
                                    .find(s => s.handleMousePressed());
    if (shapePressed){
      return true;
    } else {
      // this.generateRandomPaisleyAt(mouseX, mouseY);
      this.resetShapes();
      return true;
    }
  }

  handleMouseDragged(){
    this.shapes.filter(s => s.isDragged)
          .forEach(s => s.handleMouseDragged());
  }

  handleMouseReleased(){
    this.shapes.filter(s => s.isDragged)
          .forEach(s => s.handleMouseReleased());
  }

  toggleShapeDragging(){
    this.dragEnabled = !this.dragEnabled;
    this.shapes.forEach(s => {s.dragEnabled = this.dragEnabled});
  }

  generatePaisleyAt(tailX, tailY){
    this.generateConcentricPaisleyAt(tailX, tailY);
    // this.generateRandomPaisleyAt();
  }

  generateConcentricPaisleyAt(tailX, tailY){
    let vectorToCenter = createVector(tailX - width/2, tailY - height/2);
    const tailToHeadDirection = vectorToCenter.heading() + PI * mouseX / width;
    const tailToHeadLength = 5 + vectorToCenter.mag() + 20 * mouseY / height;

    const x = tailX + Math.cos(tailToHeadDirection) * tailToHeadLength;
    const y = tailY + Math.sin(tailToHeadDirection) * tailToHeadLength;

    let heading;
    heading = tailToHeadDirection + 0.1 + randomGaussian(QUARTER_PI, QUARTER_PI / 8);

    // const bulbRadius = 5 + randomGaussian(tailToHeadLength/4, tailToHeadLength/16);
    const bulbRadius = 5 + 1.2 * this.shapes.length;

    let p = new Paisley(x, y, heading, bulbRadius, tailX, tailY);
    let colIdx = (this.randStart + this.shapes.length) % 100;
    p.fillColor = color(colIdx , 50, 60);
    p.strokeWeight = 2;
    p.dragEnabled = this.dragEnabled;
    this.shapes.push(p);
  }

  // INACTIVE
  generateRandomPaisleyAt(tailX, tailY){
    const tailToHeadDirection = random(TAU);
    const tailToHeadLength = 20 + randomGaussian(200, 100);
    
    const x = tailX + Math.cos(tailToHeadDirection) * tailToHeadLength;
    const y = tailY + Math.sin(tailToHeadDirection) * tailToHeadLength;

    let heading;

    if (Math.random() > 0.5){
      heading = tailToHeadDirection + 0.1 + randomGaussian(QUARTER_PI, QUARTER_PI / 8);
    } else {
      heading = tailToHeadDirection - 0.1 + randomGaussian(-QUARTER_PI, QUARTER_PI / 8);
    }

    const bulbRadius = 10 + randomGaussian(tailToHeadLength/6, tailToHeadLength/16);

    let p = new Paisley(x, y, heading, bulbRadius, tailX, tailY);
    p.fillColor = color( random(100), 80, 80);
    p.strokeWeight = 2;
    p.dragEnabled = this.dragEnabled;
    this.shapes.push(p);
  }

  render(){
    this.shapes.forEach(s => s.draw());
  }
}
