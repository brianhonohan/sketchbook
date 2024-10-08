class RootTool extends BaseTool {
  constructor(tool, parentTool){
    super(tool, parentTool);
    
    this.setupTools();
  }

  setupTools(){
    this.tools = {};

    this.tools['root'] = this;
    this.tools['pen'] = new PenTool(new paper.Tool(), this);
    this.tools['line'] = new LineTool(new paper.Tool(), this);
    this.tools['rect'] = new RectTool(new paper.Tool(), this);

    this.tools['rect'].activate();
  }

  switchTo(toolId){
    if (this.tools[toolId]){
      this.tools[toolId].activate();
      return true;
    }
    return false;
  }
}