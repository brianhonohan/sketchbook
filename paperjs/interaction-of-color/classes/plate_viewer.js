class PlateViewer {
  constructor(p_xSizeAndPos){
    this.sizeAndPosition = p_xSizeAndPos;
  }

  get x(){ return this.sizeAndPosition.x; }
  get y(){ return this.sizeAndPosition.y; }
  get width(){ return this.sizeAndPosition.width; }
  get height(){ return this.sizeAndPosition.height; }
  get aspectRatio(){ return this._aspectRatioOf(this.sizeAndPosition); }

  viewPlate(plate){
    this.shapeGroup = new paper.Group();
    this.plate = plate;
    this.viewParts(plate.parts);
    this.shapeGroup.fitBounds(this.sizeAndPosition);
  }

  viewParts(parts){
    parts.forEach(p => this.viewPart(p));
  }

  viewPart(part){
    let shape = this.buildShape(part);
    if (shape) {
      shape.fillColor = this.colorFrom(part.color);
      this.shapeGroup.addChild(shape);
    }
  }

  buildShape(shapeData){
    switch (shapeData.shape){
      case "rect": return this.viewRect(shapeData);
      default: console.log(`Unrecognized shape: ${shapeData.shape}`);
    }
  }

  viewRect(shape){
    let rect = this.rectForShape(shape);
    let newRect = new paper.Shape.Rectangle(rect);
    return newRect;
  }

  rectForShape(shape){
    let point = this.pointForShape(shape.pos);
    let size = this.sizeForShape(shape.size);
    return new paper.Rectangle(point, size);
  }

  pointForShape(pos_csv){
    var pos = this.parseNumbersFromCsv(pos_csv);
    return new paper.Point( pos[0], pos[1] );
  }

  sizeForShape(size_csv){
    var size = this.parseNumbersFromCsv(size_csv);
    return new paper.Size( size[0], size[1] );
  }

  colorFrom(colorStr){
    var colorParts = this.parseNumbersFromCsv(colorStr);
    colorParts = colorParts.map(p => p / 255.0);
    return new paper.Color(colorParts[0], colorParts[1], colorParts[2]);
  }

  parseNumbersFromCsv(str){
    return str.split(',').map(p => Number(p));
  }
}