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
    this.computeBounds();
    this.calcOffsetAndScale();
    this.viewParts(plate.parts);
    this.shapeGroup.transform(this.matrix);
  }

  computeBounds(plate){
    this.plateBounds = new paper.Rectangle(0,0,0,0);
    this.plate.parts.forEach(part => this.expandToInclude(part));
  }

  expandToInclude(part){
    const tmpRect = this.rectForShape(part);
    this.plateBounds = this.plateBounds.unite(tmpRect);
  }

  calcOffsetAndScale(){
    // preserve the aspect ratio of the plate
    // center (horizontally / vertically) in this viewer's area
    // display as large as possible
    if (this.isFlatterThanPlate()){
      this.offsetAndScale = this._calcFlattenTransform();
    } else {
      this.offsetAndScale = this._calcElongateTransform();
    }

    this.matrix = new paper.Matrix();
    this.matrix.translate(this.offsetAndScale.xOffset, this.offsetAndScale.yOffset);
    this.matrix.scale(this.offsetAndScale.scale);
  }

  isFlatterThanPlate(){
    return this._isRectAFlatterThanB(this.sizeAndPosition, this.plateBounds);
  }

  _baseTransform(){
    return {
      xOffset: 0,
      yOffset: 0,
      scale: 1
    };
  }

  _calcFlattenTransform(){
    const transform = this._baseTransform();
    transform.scale = this.height / this.plateBounds.height;
    transform.xOffset = 0.5 * (this.width - this.plateBounds.width * transform.scale);
    return transform;
  }

  _calcElongateTransform(){
    const transform = this._baseTransform();
    transform.scale = this.width / this.plateBounds.width;
    transform.yOffset = 0.5 * (this.height - this.plateBounds.height * transform.scale);
    return transform;
  }

  _isRectAFlatterThanB(rectA, rectB){
    return this._aspectRatioOf(rectA) > this._aspectRatioOf(rectB);
  }

  _aspectRatioOf(rect){
    return rect.width / rect.height;
  }

  viewParts(parts){
    parts.forEach(p => this.viewPart(p));
  }

  viewPart(part){
    switch (part.shape){
      case "rect": return this.viewRect(part);
      default: console.log(`Unrecognized shape: ${part.shape}`);
    }
  }

  viewRect(shape){
    let rect = this.rectForShape(shape);
    let newRect = new paper.Shape.Rectangle(rect);
    newRect.fillColor = this.colorFrom(shape.color);
    this.shapeGroup.addChild(newRect);
  }

  rectForShape(shape){
    let point = this.pointForShape(shape);
    let size = this.sizeForShape(shape);
    return new paper.Rectangle(point, size);
  }

  pointForShape(shape){
    var pos = this.parseNumbersFromCsv(shape.pos);
    return new paper.Point( pos[0], pos[1] );
  }

  sizeForShape(shape){
    var size = this.parseNumbersFromCsv(shape.size);
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