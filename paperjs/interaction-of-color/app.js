var tool;
var path;

var plateViewer;

function setupPaper(canvasId){
  paper.setup('myCanvas');

  let width = paper.view.size._width;
  let height = paper.view.size._height;
  let xMargin = 0.1 * width;
  let yMargin = 0.1 * height;

  let rect = new paper.Rectangle(xMargin, yMargin
                                , width - 2 * xMargin
                                , height - 2 * yMargin);
  plateViewer = new PlateViewer(rect);
  plateViewer.viewPlate(Plates.v_3);
}

function handleKeyPressed(event){
  console.log('The ' + event.key + ' key was pressed!');
}