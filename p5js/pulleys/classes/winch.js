class Winch {
  constructor(x, y){
    this.circle = new Circle(x, y, 10);
    this.anchor = new AnchorPoint(this.x, this.y, this.height);
  }

  get height() { return this.radius * 3; }

  get x() { return this.circle.x; }
  get y() { return this.circle.y; }
  get radius() { return this.circle.radius; }

  hasTieOffPoint(){ return true; }

  ropeAttachmentPoint(from){
    let lineSeg = this.circle.tangentToCircle(from);
    return lineSeg.end;
  }

  isPulley(){
    return false;
  }

  tangentPoint(point, clockwiseWrap){ 
    return this.circle.tangentPoint(point, clockwiseWrap);
  }

  containsXY(x, y){ return this.circle.containsXY(x, y); }

  draw(){
    strokeWeight(2);
    fill(colorScheme.background);

    // draw base
    this.anchor.draw();

    // draw outer ring
    ellipse(this.x, this.y, this.radius * 4, this.radius * 4);

    if (this.containsXY(system.mouseX, system.mouseY)){
      fill(colorScheme.hover);
    }else{
      noFill();
    }
    this.circle.draw();
  }
}
