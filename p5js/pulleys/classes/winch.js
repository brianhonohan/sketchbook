class Winch {
  constructor(x, y){
    this.circle = new Circle(x, y, 10);
  }

  get height() { return this.radius * 3; }

  get x() { return this.circle.x; }
  get y() { return this.circle.y; }
  get radius() { return this.circle.radius; }

  ropeTieOffPoint(from){
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
    const tan30 = 0.57735026919;
    const xDelta = this.height * tan30;
    triangle(this.x - xDelta, this.y + this.height,
              this.x, this.y,
              this.x + xDelta, this.y + this.height);

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
