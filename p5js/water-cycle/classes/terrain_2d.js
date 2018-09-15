class Terrain2D {
  constructor (rect){
    this._x = rect._x;
    this._y = rect._y;
    this._width = rect._width;
    this._height = rect._height;
  }

  draw(){
    noStroke();
    fill(170,190,240);
    rect(this._x, this._x, this._width, this._height);
    this.drawSlope();
  }

  drawSlope(){
    var noiseScale = 0.01;
    
    fill(70,75,10);
    noStroke();
    beginShape(); 

    for (var x = 0; x <= this._width; x += 20) {
      var y = this._height - 20;

      y -= (  this.zone1Contribution(x)
            + this.zone2Contribution(x) 
            + this.zone3Contribution(x) 
            + this.zone4Contribution(x));
      y -= noise(x*noiseScale) * 130;

      vertex(x, y); 
    }
    vertex(this._width, this._height); // down to bottom-right corner
    vertex(0, this._height);     // over to bottom-left corner
    endShape(CLOSE);
  }

  zone1Contribution(x){
    return min(x, 0.25*this._width) * 0.2;
  }

  zone2Contribution(x){
    return min(max(0, x - 0.25*this._width), this._width / 2) * 0.1;
  }

  zone3Contribution(x){
    return min(max(0, x - 0.50*this._width), 0.75*this._width) * 0.2;
  }

  zone4Contribution(x){
    return min(max(0, x - 0.75*this._width), this._width) * 0.4;
  }
}