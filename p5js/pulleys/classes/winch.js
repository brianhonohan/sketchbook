class Winch {
  constructor(x, y){
    this.circle = new Circle(x, y, 10);
    this.anchor = new AnchorPoint(this.x, this.y, this.height);
    this.ropeSegment = null;
    this.torque = 98; // magic number 98.5 - 109
  }

  get height() { return this.radius * 3; }

  get x() { return this.circle.x; }
  get y() { return this.circle.y; }
  get radius() { return this.circle.radius; }

  hasTieOffPoint(){ 
    return !this.ropeSegment;
  }

  ropeAttachmentPoint(from){
    let lineSeg = this.circle.tangentToCircle(from);
    return lineSeg.end;
  }

  attachRopeSegment(ropeSegment){
    this.ropeSegment = ropeSegment;
  }

  isPulley(){
    return false;
  }

  tangentPoint(point, clockwiseWrap){ 
    return this.circle.tangentPoint(point, clockwiseWrap);
  }

  containsXY(x, y){ return this.circle.containsXY(x, y); }

  preTick(){
    if (!this.ropeSegment){
      return;
    }

    if (this.torque == 0){
      return;
    }

    const pullingForce = this.torque / this.radius;
    this.ropeSegment.addTension(pullingForce, this);
  }

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
