class TrackPen {
  constructor(){
    this.activePath = undefined;
    this.initTool();
  }

  initTool(){
    this.tool = new paper.Tool();

    // This appears to be necesary because the paper.Tool is not
    // a ES6 Class, but rather a function which returns an object
    // and so can't use ' extend paper.Tool'
    this.tool.onMouseDown = this.onMouseDown.bind(this);
    this.tool.onMouseDrag = this.onMouseDrag.bind(this);
    this.tool.onKeyDown = this.onKeyDown.bind(this);
  }

  onMouseDown(event){
    this.activePath = new paper.Path();
    this.activePath.strokeColor = 'black';
    this.activePath.add(event.point);
  }

  onMouseDrag(event){
    this.activePath.add(event.point);
  }

  onKeyDown(event){
    console.log('The ' + event.key + ' key was pressed!');
  }
}