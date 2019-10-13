var trackPen;
var trainEngine;
var trainSpeed = 1.5;
var trainDistTraveled;

function setupPaper(canvasId){
  paper.setup('myCanvas');

  trackPen = new TrackPen();
  paper.tool = trackPen.tool;
}


function tick(event){
  moveTrain();
}

function moveTrain(){
  trainDistTraveled += trainSpeed;
  trainEngine.position = trackPen.activePath.getPointAt(trainDistTraveled % trackPen.activePath.length);
}

function startTrain(){
  trainDistTraveled = 0;
  let startingPt = trackPen.activePath.getPointAt(trainDistTraveled);
  trainEngine = new paper.Shape.Circle(startingPt, 10);
  trainEngine.fillColor = new paper.Color(1, 0, 0);
  paper.view.onFrame = tick;
}

function stopTrain(){
  paper.view.onFrame = undefined;
}
