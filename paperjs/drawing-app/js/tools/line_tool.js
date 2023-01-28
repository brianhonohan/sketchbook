class LineTool extends BaseTool {
  constructor(tool, parentTool){
    super(tool, parentTool);
  }

  handleMouseDown(event){
    // console.log("down");
    this.line = new paper.Path.Line(event.point, event.point);
    this.line.strokeColor = 'black';
  }

  handleMouseDrag(event){
    // console.log("drag");
    this.line.lastSegment.point.x = event.point.x;
    this.line.lastSegment.point.y = event.point.y;
  }
  
  handleMouseUp(event){
    // console.log("up");
    this.line = undefined;
  }
  
  handleKeyPressed(event){
    this.parentTool.handleKeyPressed(event);
  }
}