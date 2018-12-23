class Pulley {
  constructor(x, y, radius = 10){
    this.circle = new Circle(x, y, 10);
  }

  get x() { return this.circle.x; }
  get y() { return this.circle.y; }
  get radius() { return this.circle.radius; }

  hasTieOffPoint(){ return false; }

  ropeAttachmentPoint(from){
    let lineSeg = this.circle.tangentToCircle(from);
    return lineSeg.end;
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
  }
}
