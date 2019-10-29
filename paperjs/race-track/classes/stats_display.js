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
    let tireViews = this.displays[displayIndex];
    let tires     = car.tires;

    this._setTireViewColors(tireViews, tires);
  }

  addDisplay(){
    let screenWidth = paper.view.size.width;
    let tireSize = new paper.Size(15, 25);

    let margin = 20;
    let heightOfTireDisplay = 100;

    let baseX = screenWidth - 2 * tireSize.width - 2 * margin;
    let x = baseX;
    let y = margin + ((this.getCarList().length - 1) * (heightOfTireDisplay + margin));

    let tireViews = [];
    tireViews.push( new paper.Shape.Rectangle(new paper.Point(x, y), tireSize) );

    x += tireSize.width + margin;
    tireViews.push( new paper.Shape.Rectangle(new paper.Point(x, y), tireSize) );

    x = baseX;
    y += tireSize.height + margin;
    tireViews.push( new paper.Shape.Rectangle(new paper.Point(x, y), tireSize) );

    x += tireSize.width + margin;
    tireViews.push( new paper.Shape.Rectangle(new paper.Point(x, y), tireSize) );

    this.displays.push(tireViews);
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
