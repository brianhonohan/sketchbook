var rootTool;

function setupPaper(canvasId){
  paper.setup('myCanvas');
  rootTool = new RootTool(new paper.Tool(), null);
}
