class LineTool extends BaseTool {
  constructor(tool, parentTool){
    super(tool, parentTool);
  }

  handleMouseDown(event){
    this.path = new paper.Path();
    this.path.strokeColor = 'black';
    this.path.add(event.point);
  }

  handleMouseDrag(event){
    this.path.add(event.point);
  }
  
  handleKeyPressed(event){
    this.parentTool.handleKeyPressed(event);
  }
}