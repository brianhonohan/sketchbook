class Pulley {
  constructor(x, y, radius = 10){
    this.circle = new Circle(x, y, 10);
    this.ropeSegment1 = null;
    this.ropeSegment2 = null;
  }

  get x() { return this.circle.x; }
  get y() { return this.circle.y; }
  get radius() { return this.circle.radius; }

  anchorAt(anchor){
    this.anchor = anchor;
  }

  hasTieOffPoint(){ return false; }

  ropeAttachmentPoint(from){
    let lineSeg = this.circle.tangentToCircle(from);
    return lineSeg.end;
  }

  attachRopeSegment(ropeSegment){
    if (this.ropeSegment1 == null){
      this.ropeSegment1 = ropeSegment;
    }else if (this.ropeSegment2 == null){
      this.ropeSegment2 = ropeSegment;
    }
  }

  isPulley(){
    return true;
  }

  tangentPoint(point, clockwiseWrap){ 
    return this.circle.tangentPoint(point, clockwiseWrap);
  }

  containsXY(x, y){ return this.circle.containsXY(x, y); }

  draw(){
    if (this.containsXY(system.mouseX, system.mouseY)){
      fill(colorScheme.hover);
    }else{
      noFill();
    }

    strokeWeight(2);
    this.circle.draw();

    if (this.anchor){ 
      fill(230);
      noStroke();
      this.anchor.draw();
    }
  }
}
