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
  plateViewer.viewPlate(Plates.iv_3);

  tool = new paper.Tool();
  tool.onMouseDown = handleMouseDown;
  tool.onMouseDrag = handleMouseDrag;
  tool.onKeyDown = handleKeyPressed;
}

function handleMouseDown(event){
  path = new paper.Path();
  path.strokeColor = 'black';
  path.add(event.point);
}

function handleMouseDrag(event){
  path.add(event.point);
}

function handleKeyPressed(event){
  console.log('The ' + event.key + ' key was pressed!');
}