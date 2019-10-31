class StatsDisplay {
  constructor(){
    this.displays = [];
  }

  tick(){
    this.updateDisplays();
  }

  updateDisplays(){
    this.getCarList().forEach((car, index) => {
      this.updateDisplayForCar(index, car);
    });
  }

  getCarList(){
    return components; // Warning: global variable
  }

  updateDisplayForCar(displayIndex, car){
    let display = this.displays[displayIndex];
    let tires     = car.tires;

    display.carMarker.fillColor = car.color;
    this._setTireViewColors(display.tireViews, tires);
  }

  addDisplay(){
    let screenWidth = paper.view.size.width;
    let tireSize = new paper.Size(15, 25);

    let margin = 20;
    let heightOfTireDisplay = 70;

    let baseX = screenWidth - 2 * tireSize.width - 2 * margin;
    let baseY = margin + ((this.getCarList().length - 1) * (heightOfTireDisplay + margin));
    let x = baseX + 10;
    let y = baseY;

    let tireViews = [];
    tireViews.push( new paper.Shape.Rectangle(new paper.Point(x, y), tireSize) );

    x += tireSize.width + margin;
    tireViews.push( new paper.Shape.Rectangle(new paper.Point(x, y), tireSize) );

    x = baseX + 10;
    y += tireSize.height + margin;
    tireViews.push( new paper.Shape.Rectangle(new paper.Point(x, y), tireSize) );

    x += tireSize.width + margin;
    tireViews.push( new paper.Shape.Rectangle(new paper.Point(x, y), tireSize) );

    let carMarker = new paper.Shape.Rectangle(new paper.Point(baseX, baseY),
                                              new paper.Point(baseX + 5, baseY + heightOfTireDisplay));

    let display = {
      carMarker: carMarker,
      tireViews: tireViews
    }
    this.displays.push(display);
  }

  _setTireViewColors(tireViews, tires){
    tireViews.forEach((tireView, idx) => {
      tireView.fillColor = this.colorForTire(tires[idx]);
    });
  }

  colorForTire(tire){
    return this.colorForTireCondition(tire);
  }

  colorForTireCondition(condition){
    let red   = 1 - condition;
    let green = condition;
    return new paper.Color(red, green, 0);
  }
}
