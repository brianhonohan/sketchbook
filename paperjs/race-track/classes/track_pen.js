class TrackPen {
  constructor(){
    this.activePath = undefined;
    this.paths = [];
    this.initTool();
  }

  initTool(){
    this.tool = new paper.Tool();
    this.tool.minDistance = 40;

    // This appears to be necesary because the paper.Tool is not
    // a ES6 Class, but rather a function which returns an object
    // and so can't use ' extend paper.Tool'
    this.tool.onMouseDown = this.onMouseDown.bind(this);
    this.tool.onMouseDrag = this.onMouseDrag.bind(this);
    this.tool.onMouseUp = this.onMouseUp.bind(this);
    this.tool.onKeyDown = this.onKeyDown.bind(this);
  }

  onMouseDown(event){
    this.activePath = new paper.Path();
    this.activePath.strokeColor = 'black';
    this.activePath.add(event.point);
    this.paths.push(this.activePath);
  }

  onMouseDrag(event){
    this.activePath.add(event.point);
    this.activePath.smooth();
  }

  onMouseUp(event){
    this.activePath.closed = true;
    this.activePath.smooth();
    this.activePath.flatten();
    this.activePath.simplify();
    this.activePath.selected = true;
  }

  onKeyDown(event){
    console.log('The ' + event.key + ' key was pressed!');

    if (event.key == 'backspace') {
      this.clearPaths();
    } else if (event.key == 's'){
      this.activePath.simplify();
    } else if (event.key == 'm'){
      this.activePath.smooth();
    } else if (event.key == 'f'){
      this.activePath.flatten(1);
    } else if (event.key == 't'){
      startTrain();
    } else if (event.key == 'r'){
      startRaceCar();
    } else if (event.key == 'escape'){
      stopTrain();
      stopRaceCar();
    }
  }

  clearPaths(){
    this.paths.forEach(p => p.remove());
    this.paths = [];
  }
}
