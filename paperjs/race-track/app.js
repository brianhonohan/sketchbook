var system;

function setupPaper(canvasId){
  paper.setup('myCanvas');

  system = new System();
}

function tick(event){
  system.tick();
}
