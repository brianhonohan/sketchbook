var trackPen;
var trainEngine;
var car;
var components;
var statsDisplay = new StatsDisplay();

function setupPaper(canvasId){
  paper.setup('myCanvas');

  trackPen = new TrackPen();
  paper.tool = trackPen.tool;
  components = [];
}

function tick(event){
  components.forEach(c => c.tick());
  statsDisplay.tick();
}

function startTrain(){
  trainEngine = new TrainEngine(trackPen.activePath);
  components.push(trainEngine);
  paper.view.onFrame = tick;
}

function stopTrain(){
  paper.view.onFrame = undefined;
}

function startRaceCar(){
  car = new RaceCar(trackPen.activePath);
  components.push(car);
  statsDisplay.addDisplay();
  paper.view.onFrame = tick;
}

function stopRaceCar(){
  paper.view.onFrame = undefined;
}

function clearComponents(){
  components.forEach(c => c.remove());
  statsDisplay.clear();
}
