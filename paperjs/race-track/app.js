var trackPen;
var trainEngine;
var components;

function setupPaper(canvasId){
  paper.setup('myCanvas');

  trackPen = new TrackPen();
  paper.tool = trackPen.tool;
  components = [];
}


function tick(event){
  components.forEach(c => c.tick());
}

function startTrain(){
  trainEngine = new TrainEngine(trackPen.activePath);
  components.push(trainEngine);
  paper.view.onFrame = tick;
}

function stopTrain(){
  paper.view.onFrame = undefined;
}
