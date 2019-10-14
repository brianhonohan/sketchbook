var trackPen;
var trainEngine;

function setupPaper(canvasId){
  paper.setup('myCanvas');

  trackPen = new TrackPen();
  paper.tool = trackPen.tool;
}


function tick(event){
  trainEngine.tick();
}

function startTrain(){
  trainEngine = new TrainEngine(trackPen.activePath);
  paper.view.onFrame = tick;
}

function stopTrain(){
  paper.view.onFrame = undefined;
}
