class RootTool extends BaseTool {
  constructor(tool, parentTool){
    super(tool, parentTool);
    
    this.setupTools();
  }

  setupTools(){
    this.tools = {};

    this.tools['root'] = this;
    this.tools['pen'] = new PenTool(new paper.Tool(), this);

    this.tools['pen'].activate();
  }
}