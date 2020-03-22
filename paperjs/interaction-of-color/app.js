var tool;
var path;

var plateViewer;

function setupPaper(canvasId){
  paper.setup('myCanvas');

  let rect = new paper.Rectangle(0, 0, paper.view.size._width, paper.view.size._height);
  plateViewer = new PlateViewer(rect);
  plateViewer.viewPlate(Plates.iv_1);

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