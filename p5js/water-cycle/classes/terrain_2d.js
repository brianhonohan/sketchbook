class Terrain2D {
  constructor (rect){
    this._x = rect._x;
    this._y = rect._y;
    this._width = rect._width;
    this._height = rect._height;

    this.gBuffer = createGraphics(this._width, this._height);
    this.render();
  }

  draw(){
    image(this.gBuffer, this._x, this._y);
  }

  render(){
    this.gBuffer.noStroke();
    this.gBuffer.fill(170,190,240);
    this.gBuffer.rect(this._x, this._x, this._width, this._height);

    this.renderSlope();
  }

  renderSlope(){
    var noiseScale = 0.01;

    this.gBuffer.fill(70,75,10);
    this.gBuffer.noStroke();
    this.gBuffer.beginShape(); 

    for (var x = 0; x <= this._width; x += 2) {
      var y = this._height - 10;

      y -= (  this.zone1Contribution(x)
            + this.zone2Contribution(x) 
            + this.zone3Contribution(x) 
            + this.zone4Contribution(x));
      y -= noise(x*noiseScale) * 50;

      this.gBuffer.vertex(x, y); 
    }
    this.gBuffer.vertex(this._width, this._height); // down to bottom-right corner
    this.gBuffer.vertex(0, this._height);     // over to bottom-left corner
    this.gBuffer.endShape(CLOSE);
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