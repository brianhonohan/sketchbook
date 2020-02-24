class UserInterface {
  constructor(system){
    this.system = system;
    this.trackPen = new TrackPen(this, this.system);

    this.initTool();
    this.setActiveTool(UserInterface.TOOL_TRACK_PEN);
  }

  initTool(){
    this.tool = new paper.Tool();

    // This appears to be necesary because the paper.Tool is not
    // a ES6 Class, but rather a function which returns an object
    // and so can't use ' extend paper.Tool'
    this.tool.onMouseDown = this.onMouseDown.bind(this);
    this.tool.onMouseDrag = this.onMouseDrag.bind(this);
    this.tool.onMouseUp = this.onMouseUp.bind(this);
    this.tool.onKeyDown = this.onKeyDown.bind(this);
  }

  static get TOOL_DEFAULT(){ return 0; }
  static get TOOL_TRACK_PEN(){ return 1; }

  setActiveTool(toolId){
    switch (toolId) {
      case UserInterface.TOOL_TRACK_PEN:
        paper.tool = this.trackPen.tool;
        break;
      default:
        paper.tool = this.tool;
    }
  }

  onMouseDown(event){
  }

  onMouseDrag(event){
  }

  onMouseUp(event){
  }

  onKeyDown(event){
    console.log('The ' + event.key + ' key was pressed in UI!');

    if (event.key == 'c') {
      this.trackPen.clearPaths();
      this.system.clearComponents();
      this.system.pause();
      this.setActiveTool(UserInterface.TOOL_TRACK_PEN);
    } else if (event.key == 'r'){
      this.system.buildTrack(this.trackPen.activePath);
      this.system.startRaceCar();
      this.setActiveTool(UserInterface.TOOL_DEFAULT);
    } else if (event.key == 'p'){
      this.setActiveTool(UserInterface.TOOL_TRACK_PEN);
    } else if (event.key == '\\'){
      this.system.togglePause();
    } else if (event.key == 'escape'){
      this.system.pause();
    }
  }
}