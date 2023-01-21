var tool;
var path;

function setupPaper(canvasId){
  paper.setup('myCanvas');
  setupTools();
}

function setupTools(){
  let rootTool = new RootTool(new paper.Tool(), null);
  let lineTool = new LineTool(new paper.Tool(), rootTool);

  lineTool.activate();
}
