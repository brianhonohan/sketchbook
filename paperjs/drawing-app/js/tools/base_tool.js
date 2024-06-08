class BaseTool {
  constructor(tool, parentTool){
    this.tool = tool;

    var that = this;
    this.tool.onMouseDown = function(event) { that.handleMouseDown(event) };
    this.tool.onMouseUp = function(event) { that.handleMouseUp(event) };
    this.tool.onMouseDrag = function(event) { that.handleMouseDrag(event) };
    this.tool.onKeyDown = function(event) { that.handleKeyPressed(event) };

    // At this time, not supporting:
    // onMouseMove
    // onMouseUp
    // onKeyUp

    if (parentTool != undefined){
      this.parentTool = parentTool;
    }
  }

  handleMouseDown(event){
    console.log(`handleMouseDown:`);
    console.log(event);
  }

  handleMouseUp(event){
    console.log(`handleMouseUp:`);
    console.log(event);
  }

  handleMouseDrag(event){
    console.log(`handleMouseDrag:`);
    console.log(event);
  }
  
  handleKeyPressed(event){
    console.log('The ' + event.key + ' key was pressed!');
  }

  activate(){
    paper.tool = this.tool;
  }
}